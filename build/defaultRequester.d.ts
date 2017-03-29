import { IRequester } from "./requester";
import Requester = require("src/requester");
export declare class DefaultRequester implements IRequester {
    private req;
    private jar;
    constructor();
    setDefaultOptions(opts: Requester.RequesterOptions): void;
    get(url: string, opts?: Requester.RequesterOptions): Promise<string>;
    postForm(url: string, form: Requester.StringTable, opts?: Requester.RequesterOptions): Promise<string>;
    getCookie(url: string, name: string): string;
}
