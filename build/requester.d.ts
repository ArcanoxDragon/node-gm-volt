export interface StringTable {
    [key: string]: string;
}
export interface RequesterOptions {
    baseUrl?: string;
    qs?: string;
    headers?: StringTable;
    form?: StringTable;
}
export interface IRequester {
    setDefaultOptions(opts: RequesterOptions): any;
    get(url: string, opts?: RequesterOptions): Promise<string>;
    postForm(url: string, form: StringTable, opts?: RequesterOptions): Promise<string>;
    getCookie(url: string, name: string): string;
}
