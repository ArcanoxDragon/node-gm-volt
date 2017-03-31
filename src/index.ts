export * from "./gm";
export * from "./requester";

export interface ChargeStatus {
    pluggedIn: boolean;
    evRange: number;
    totalRange: number;
    chargePercent: number;
    estDoneBy: string;
}

export interface Credentials {
    username: string;
    password: string;
    captchaId?: string;
    captchaAnswer?: string;
}