import { useLayoutEffect, useState } from "react";
export default function useViewportHeight() {
    const [height, setHeight] = useState(() => window.visualViewport?.height || window.innerHeight);
    useLayoutEffect(() => {
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
//# sourceMappingURL=useViewportHeight.js.map