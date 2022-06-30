import * as React from "react";
import { EditorState, Transaction } from "prosemirror-state";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { DefaultTheme } from "styled-components";
export declare enum ToastType {
    Error = "error",
    Info = "info"
}
export declare type MenuItem = {
    icon?: typeof React.Component | React.FC<any>;
    name?: string;
    title?: string;
    shortcut?: string;
    keywords?: string;
    tooltip?: string;
    defaultHidden?: boolean;
    attrs?: Record<string, any>;
    visible?: boolean;
    active?: (state: EditorState) => boolean;
};
export declare type EmbedDescriptor = MenuItem & {
    icon: React.FC<any>;
    matcher: (url: string) => boolean | [] | RegExpMatchArray;
    component: typeof React.Component | React.FC<any>;
};
export declare type ComponentProps = {
    theme: DefaultTheme;
    node: ProsemirrorNode;
    isSelected: boolean;
    isEditable: boolean;
    getPos: () => number;
};
export declare type Dispatch = (tr: Transaction) => void;
export declare enum EventType {
    blockMenuOpen = "blockMenuOpen",
    blockMenuClose = "blockMenuClose",
    emojiMenuOpen = "emojiMenuOpen",
    emojiMenuClose = "emojiMenuClose",
    linkMenuOpen = "linkMenuOpen",
    linkMenuClose = "linkMenuClose"
}
export declare type Role = "admin" | "viewer" | "member";
export declare type DateFilter = "day" | "week" | "month" | "year";
export declare type PublicEnv = {
    URL: string;
    CDN_URL: string;
    COLLABORATION_URL: string;
    AWS_S3_UPLOAD_BUCKET_URL: string;
    AWS_S3_ACCELERATE_URL: string;
    DEPLOYMENT: "hosted" | "";
    ENVIRONMENT: "production" | "development";
    SENTRY_DSN: string | undefined;
    TEAM_LOGO: string | undefined;
    SLACK_KEY: string | undefined;
    SLACK_APP_ID: string | undefined;
    MAXIMUM_IMPORT_SIZE: number;
    SUBDOMAINS_ENABLED: boolean;
    EMAIL_ENABLED: boolean;
    GOOGLE_ANALYTICS_ID: string | undefined;
    RELEASE: string | undefined;
};
export declare type ToastOptions = {
    type: "warning" | "error" | "info" | "success";
    timeout?: number;
    action?: {
        text: string;
        onClick: React.MouseEventHandler<HTMLSpanElement>;
    };
};
//# sourceMappingURL=index.d.ts.map