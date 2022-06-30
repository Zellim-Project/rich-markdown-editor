"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useComponentSize(ref) {
    const [size, setSize] = (0, react_1.useState)({
        width: ref.current?.clientWidth || 0,
        height: ref.current?.clientHeight || 0,
    });
    (0, react_1.useEffect)(() => {
        const sizeObserver = new ResizeObserver(entries => {
            entries.forEach(({ target }) => {
                if (size.width !== target.clientWidth ||
                    size.height !== target.clientHeight) {
                    setSize({ width: target.clientWidth, height: target.clientHeight });
                }
            });
        });
        if (ref.current) {
            sizeObserver.observe(ref.current);
        }
        return () => sizeObserver.disconnect();
    }, [ref]);
    return size;
}
exports.default = useComponentSize;
//# sourceMappingURL=useComponentSize.js.map