"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
function useEventListener(eventName, handler, element = window, options = {}) {
    const savedHandler = React.useRef();
    const { capture, passive, once } = options;
    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    React.useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) {
            return;
        }
        const eventListener = event => savedHandler.current?.(event);
        const opts = { capture, passive, once };
        element.addEventListener(eventName, eventListener, opts);
        return () => element.removeEventListener(eventName, eventListener, opts);
    }, [eventName, element, capture, passive, once]);
}
exports.default = useEventListener;
//# sourceMappingURL=useEventListener.js.map