import { Plugin } from "prosemirror-state";
export declare const LANGUAGES: {
    none: string;
    bash: string;
    css: string;
    clike: string;
    csharp: string;
    go: string;
    markup: string;
    objectivec: string;
    java: string;
    javascript: string;
    json: string;
    perl: string;
    php: string;
    powershell: string;
    python: string;
    ruby: string;
    rust: string;
    sql: string;
    solidity: string;
    typescript: string;
    yaml: string;
};
export default function Prism({ name }: {
    name: string;
}): Plugin<any, any>;
//# sourceMappingURL=Prism.d.ts.map