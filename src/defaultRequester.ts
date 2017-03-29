import * as req from "request-promise-native";
import { RequestAPI } from "request";

import { IRequester } from "./requester";
import Requester = require("src/requester");

export class DefaultRequester implements IRequester {
    private req: RequestAPI<any, any, any>;
    private jar = req.jar();

    constructor() {
        this.req = req.defaults( { jar: this.jar } );
    }

    setDefaultOptions( opts: Requester.RequesterOptions ) {
        this.req = req.defaults( {
            jar: this.jar,
            ...opts
        } );
    }

    get( url: string, opts?: Requester.RequesterOptions ): Promise<string> {
        return this.req.get( url, opts );
    }

    postForm( url: string, form: Requester.StringTable, opts?: Requester.RequesterOptions ): Promise<string> {
        return this.req.post( url, {
            form,
            ...opts
        } );
    }

    getCookie( url: string, name: string ): string {
        let cookies = this.jar.getCookies( url ) as any[];
        let cookie: any = cookies.find( c => c.key.toLowerCase() === name.toLowerCase() );

        if ( !cookie ) return null;

        return cookie.value;
    }
}