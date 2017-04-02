export * from "./gm";
export * from "./requester";

export interface ChargeStatus {
    pluggedIn: boolean;
    evRange: number;
    evUnit: string;
    totalRange: number;
    totalUnit: string;
    chargePercent: number;
    estDoneBy: string;
}

export interface Credentials {
    username: string;
    password: string;
    captchaId?: string;
    captchaAnswer?: string;
}