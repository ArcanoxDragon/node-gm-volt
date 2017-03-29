﻿import * as cheerio from "cheerio";
import * as delay from "promise-delay";
import * as query from "./myvolt/query";
import * as web from "./web";

export async function init() {
    await web.get( "/" );
}

export async function login( credentials: Credentials ): Promise<void> {
    let form = {
        user: credentials.username,
        password: credentials.password,
        remember: "on",
        captchaId: "",
        captchaAnswer: "",
        formName: "AccountLoginForm",
        userAction: "validateUserCredentials"
    };

    let sessionCookie = web.getCookie( "JSESSIONID" );
    if ( !sessionCookie ) throw new Error( "Session cookie does not exist" );

    let result = await web.postFormJsonP( `/web/portal/home;jsessionid=${ sessionCookie.value }`, form, { qs: query.validateLogin } );

    if ( result.result === "invalid" ) throw new Error( "Invalid credentials" );

    delete form.formName;
    form.userAction = "login";

    await web.postForm( `/web/portal/home;jsessionid=${ sessionCookie.value }`, form, { qs: query.login } );
}

export async function getChargeStatus(): Promise<ChargeStatus> {
    let sessionCookie = web.getCookie( "JSESSIONID" );
    if ( !sessionCookie ) throw new Error( "Session cookie does not exist" );

    let form = {
        initiate: "true"
    };

    let result = await web.postForm( "/web/portal/home", form, { qs: query.polling } );
    let $ = cheerio.load( result );

    if ( !$ ) throw new Error( "Charging status could not be retrieved" );

    let error = $( "status" ).attr( "error" );

    if ( error ) throw new Error( `OnStar returned error: ${ error }` );

    let doContinue = true;
    let chargeStatus: boolean | ChargeStatus = null;

    while ( doContinue ) {
        chargeStatus = await pollChargeStatus( sessionCookie.value, chargeStatus === null );

        if ( chargeStatus === false ) {
            await delay( 1000 );
        } else {
            doContinue = false;
        }
    }

    return chargeStatus as ChargeStatus;
}

async function pollChargeStatus( chargingSessionId: string, initial: boolean ): Promise<boolean | ChargeStatus> {
    let form = initial
                   ? {
                       initiate: "true",
                       chargingSessionId
                   }
                   : {
                       checkstatus: "chargingdata",
                       chargingSessionId
                   };

    let result = await web.postForm( "/web/portal/home", form, { qs: query.charging } );
    let $ = cheerio.load( result );
    let status = $( "status" );

    if ( !status ) throw new Error( "Unable to poll charging status" );

    let statusCode = parseInt( status.attr( "value" ) );

    if ( statusCode === 2 || ( statusCode === 0 && status.attr( "connect" ) === "true" ) ) {
        return false;
    } else if ( statusCode === 0 ) {
        return {
            pluggedIn: $( "pluggedIn" ).attr( "value" ) === "plugged",
            evRange: parseInt( $( "estEVRange" ).attr( "value" ) ),
            totalRange: parseInt( $( "estTotRange" ).attr( "value" ) ),
            chargePercent: parseInt( $( "currCharge" ).attr( "value" ) ),
            estDoneBy: $( "estFullCharge" ).attr( "value" )
        } as ChargeStatus;
    } else {
        throw new Error( `Unexpected status code: ${ statusCode }` );
    }
}