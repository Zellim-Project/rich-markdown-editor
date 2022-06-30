import { PublicEnv } from "./types";
declare global {
    interface Window {
        env: PublicEnv;
    }
}
declare const env: PublicEnv;
export default env;
//# sourceMappingURL=env.d.ts.map