import { IRequester, StringTable } from "./requester";
export declare function init(requester: IRequester): void;
export declare function get(url: string, otherOptions?: any): Promise<string>;
export declare function postForm(url: string, formData: StringTable, otherOptions?: any): Promise<string>;
export declare function postFormJsonP(url: string, formData: StringTable, otherOptions?: any): Promise<any>;
export declare function getCookie(name: string): string;
