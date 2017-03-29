export * from "./gm";
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
}
