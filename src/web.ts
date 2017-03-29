import * as req from "request-promise-native";

import config from "./config";
import headers from "./myvolt/headers";

declare module "request" {
    interface Cookie {
        key: string;
        value: string;
    }
}

export interface FormData {
    [ key: string ]: string
}

const baseUrl = `${ config.protocol }://${ config.domain }/`;
const jar = req.jar();
const jspMatch = /^jsonp\d+\((.*)\)$/i;
const r = req.defaults( {
    baseUrl,
    gzip: true,
    headers,
    jar
} );

export function get( url: string, otherOptions?: any ): req.RequestPromise {
    return r( url, otherOptions );
}

export function postForm( url: string, formData: FormData, otherOptions?: any ): req.RequestPromise {
    let opts = {
        form: formData,
        ...otherOptions
    };

    return r.post( url, opts );
}

export async function postFormJsonP( url: string, formData: FormData, otherOptions?: any ): Promise<any> {
    let result = await postForm( url, formData, otherOptions );
    let match = result.match( jspMatch );

    if ( !match ) throw new Error( "Invalid JSONP response" );

    let json = JSON.parse( match[ 1 ] );

    if ( !json ) throw new Error( "Invalid JSONP response" );

    return json;
}

export function getCookie( name: string ): any {
    let cookies = jar.getCookies( baseUrl );
    let cookie = cookies.find( c => c.key.toLowerCase() === name.toLowerCase() );

    if ( !cookie ) return null;

    return cookie;
}