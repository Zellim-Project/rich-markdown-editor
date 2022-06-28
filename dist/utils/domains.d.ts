declare type Domain = {
    tld: string;
    subdomain: string;
    domain: string;
};
export declare function parseDomain(url?: string): Domain | null | undefined;
export declare function stripSubdomain(hostname: string): string;
export declare function isCustomSubdomain(hostname: string): boolean;
export declare const RESERVED_SUBDOMAINS: string[];
export {};
//# sourceMappingURL=domains.d.ts.map