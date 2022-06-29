"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("markdown-it/lib/token"));
const env_1 = __importDefault(require("../env"));
function isParagraph(token) {
    return token.type === "paragraph_open";
}
function isInline(token) {
    return token.type === "inline";
}
function isLinkOpen(token) {
    return token.type === "link_open";
}
function isLinkClose(token) {
    return token.type === "link_close";
}
function isAttachment(token) {
    const href = token.attrGet("href");
    return (href?.startsWith("/api/attachments.redirect") ||
        ((href?.startsWith(env_1.default.AWS_S3_UPLOAD_BUCKET_URL) ||
            href?.startsWith(env_1.default.AWS_S3_ACCELERATE_URL)) &&
            href?.includes("X-Amz-Signature")));
}
function linksToAttachments(md) {
    md.core.ruler.after("breaks", "attachments", state => {
        const tokens = state.tokens;
        let insideLink;
        for (let i = 0; i < tokens.length - 1; i++) {
            if (isInline(tokens[i]) && isParagraph(tokens[i - 1])) {
                const tokenChildren = tokens[i].children || [];
                for (let j = 0; j < tokenChildren.length - 1; j++) {
                    const current = tokenChildren[j];
                    if (!current) {
                        continue;
                    }
                    if (isLinkOpen(current)) {
                        insideLink = current;
                        continue;
                    }
                    if (isLinkClose(current)) {
                        insideLink = null;
                        continue;
                    }
                    if (insideLink && isAttachment(insideLink)) {
                        const { content } = current;
                        const token = new token_1.default("attachment", "a", 0);
                        token.attrSet("href", insideLink.attrGet("href") || "");
                        const parts = content.split(" ");
                        const size = parts.pop();
                        const title = parts.join(" ");
                        token.attrSet("size", size || "0");
                        token.attrSet("title", title);
                        tokens.splice(i - 1, 3, token);
                        insideLink = null;
                        break;
                    }
                }
            }
        }
        return false;
    });
}
exports.default = linksToAttachments;
//# sourceMappingURL=attachments.js.map