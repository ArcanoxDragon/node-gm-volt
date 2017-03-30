import config from "./config";
import headers from "./myvolt/headers";
import { IRequester, StringTable } from "./requester";

let r: IRequester = null;

const baseUrl = `${ config.protocol }://${ config.domain }/`;
const jspMatch = /^jsonp\d+\((.*)\)$/i;

export function init( requester: IRequester ) {
    r = requester;
    r.setDefaultOptions( {
        baseUrl,
        headers
    } );
}

function assertInit() {
    if ( !r ) throw new Error( "Web module not initialized" );
}

export function get( url: string, otherOptions?: any ): Promise<string> {
    assertInit();
    return r.get( url, otherOptions );
}

export function postForm( url: string, formData: StringTable, otherOptions?: any ): Promise<string> {
    assertInit();
    return r.postForm( url, formData, otherOptions );
}

export async function postFormJsonP( url: string, formData: StringTable, otherOptions?: any ): Promise<any> {
    assertInit();
    let result = await postForm( url, formData, otherOptions );
    let match = result.match( jspMatch );

    if ( !match ) throw new Error( "Invalid JSONP response" );

    let json = JSON.parse( match[ 1 ] );

    if ( !json ) throw new Error( "Invalid JSONP response" );

    return json;
}

export function getCookie( name: string ): string {
    assertInit();
    return r.getCookie( baseUrl, name );
}