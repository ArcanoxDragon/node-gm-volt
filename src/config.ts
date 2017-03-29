export interface Config {
    protocol: "http" | "https";
    domain: string;
}

export default require( "../config.json" ) as Config;