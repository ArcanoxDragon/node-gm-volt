/// <reference types="request-promise-native" />
import * as req from "request-promise-native";
declare module "request" {
    interface Cookie {
        key: string;
        value: string;
    }
}
export interface FormData {
    [key: string]: string;
}
export declare function get(url: string, otherOptions?: any): req.RequestPromise;
export declare function postForm(url: string, formData: FormData, otherOptions?: any): req.RequestPromise;
export declare function postFormJsonP(url: string, formData: FormData, otherOptions?: any): Promise<any>;
export declare function getCookie(name: string): any;
