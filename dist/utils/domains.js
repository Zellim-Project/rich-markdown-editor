"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESERVED_SUBDOMAINS = exports.isCustomSubdomain = exports.stripSubdomain = exports.parseDomain = void 0;
const lodash_1 = require("lodash");
function parseDomain(url) {
    if (typeof url !== "string") {
        return null;
    }
    if (url === "") {
        return null;
    }
    const normalizedDomain = (0, lodash_1.trim)(url.replace(/(https?:)?\/\//, ""));
    const parts = normalizedDomain.split(".");
    function cleanTLD(tld = "") {
        return tld.split(/[/:?]/)[0];
    }
    if (parts.length >= 3) {
        return {
            subdomain: parts[0],
            domain: parts[1],
            tld: cleanTLD(parts.slice(2).join(".")),
        };
    }
    if (parts.length === 2) {
        return {
            subdomain: "",
            domain: parts[0],
            tld: cleanTLD(parts.slice(1).join(".")),
        };
    }
    if (parts.length === 1) {
        return {
            subdomain: "",
            domain: cleanTLD(parts.slice(0).join()),
            tld: "",
        };
    }
    return null;
}
exports.parseDomain = parseDomain;
function stripSubdomain(hostname) {
    const parsed = parseDomain(hostname);
    if (!parsed) {
        return hostname;
    }
    if (parsed.tld) {
        return `${parsed.domain}.${parsed.tld}`;
    }
    return parsed.domain;
}
exports.stripSubdomain = stripSubdomain;
function isCustomSubdomain(hostname) {
    const parsed = parseDomain(hostname);
    if (!parsed ||
        !parsed.subdomain ||
        parsed.subdomain === "app" ||
        parsed.subdomain === "www") {
        return false;
    }
    return true;
}
exports.isCustomSubdomain = isCustomSubdomain;
exports.RESERVED_SUBDOMAINS = [
    "about",
    "account",
    "admin",
    "advertising",
    "api",
    "app",
    "assets",
    "archive",
    "beta",
    "billing",
    "blog",
    "cache",
    "cdn",
    "code",
    "community",
    "dashboard",
    "developer",
    "developers",
    "forum",
    "help",
    "home",
    "http",
    "https",
    "imap",
    "localhost",
    "mail",
    "marketing",
    "mobile",
    "multiplayer",
    "new",
    "news",
    "newsletter",
    "ns1",
    "ns2",
    "ns3",
    "ns4",
    "password",
    "profile",
    "realtime",
    "sandbox",
    "script",
    "scripts",
    "setup",
    "signin",
    "signup",
    "site",
    "smtp",
    "support",
    "status",
    "static",
    "stats",
    "test",
    "update",
    "updates",
    "ws",
    "wss",
    "web",
    "websockets",
    "www",
    "www1",
    "www2",
    "www3",
    "www4",
];
//# sourceMappingURL=domains.js.map