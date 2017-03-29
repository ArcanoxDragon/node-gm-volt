import { IRequester, RequesterOptions, StringTable } from "./requester";
export declare class DefaultRequester implements IRequester {
    private req;
    private jar;
    constructor();
    setDefaultOptions(opts: RequesterOptions): void;
    get(url: string, opts?: RequesterOptions): Promise<string>;
    postForm(url: string, form: StringTable, opts?: RequesterOptions): Promise<string>;
    getCookie(url: string, name: string): string;
}
