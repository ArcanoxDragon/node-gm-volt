import { ChargeStatus, Credentials } from ".";
import { IRequester } from "./requester";
export declare function init(requester: IRequester): Promise<void>;
export declare function login(credentials: Credentials): Promise<void>;
export declare function getChargeStatus(): Promise<ChargeStatus>;
