"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useViewportHeight() {
    const [height, setHeight] = (0, react_1.useState)(() => window.visualViewport?.height || window.innerHeight);
    (0, react_1.useLayoutEffect)(() => {
        const handleResize = () => {
            setHeight(() => window.visualViewport?.height || window.innerHeight);
        };
        window.visualViewport?.addEventListener("resize", handleResize);
        return () => {
            window.visualViewport?.removeEventListener("resize", handleResize);
        };
    }, []);
    return height;
}
exports.default = useViewportHeight;
//# sourceMappingURL=useViewportHeight.js.map