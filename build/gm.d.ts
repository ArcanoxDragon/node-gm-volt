import { ChargeStatus, Credentials } from ".";
export declare function init(): Promise<void>;
export declare function login(credentials: Credentials): Promise<void>;
export declare function getChargeStatus(): Promise<ChargeStatus>;
