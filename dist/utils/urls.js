"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExternalUrl = exports.isInternalUrl = exports.cdnPath = void 0;
const domains_1 = require("./domains");
const env = typeof window !== "undefined" ? window.env : process.env;
function cdnPath(path) {
    return `${env.CDN_URL}${path}`;
}
exports.cdnPath = cdnPath;
function isInternalUrl(href) {
    if (href[0] === "/") {
        return true;
    }
    const outline = typeof window !== "undefined"
        ? (0, domains_1.parseDomain)(window.location.href)
        : undefined;
    const parsed = (0, domains_1.parseDomain)(href);
    if (parsed &&
        outline &&
        parsed.subdomain === outline.subdomain &&
        parsed.domain === outline.domain &&
        parsed.tld === outline.tld) {
        return true;
    }
    return false;
}
exports.isInternalUrl = isInternalUrl;
function isExternalUrl(href) {
    return !isInternalUrl(href);
}
exports.isExternalUrl = isExternalUrl;
//# sourceMappingURL=urls.js.map