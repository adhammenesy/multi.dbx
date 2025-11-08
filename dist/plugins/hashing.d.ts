import { AutoHasPluginConfig } from "../../types/plugins";
export default class AutoHash {
    private config;
    constructor();
    private configChecker;
    configure(config: AutoHasPluginConfig): this;
    WhoIam(): Record<string, string | this>;
    hash(k: string): string;
    unhash(hash: string): string;
    run(arg: string): string;
}
//# sourceMappingURL=hashing.d.ts.map