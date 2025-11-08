"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AutoHash {
    constructor() {
        this.config = [{ keywords: null, secret: "" }];
    }
    configChecker() {
        this.config.forEach((Data) => {
            if (Object.values(Data).includes(null))
                throw new Error("Please Config The \"AutoHash\" Plugin.configure(config: AutoHasPluginConfig[])");
        });
    }
    configure(config) {
        this.config[0] = config;
        return this;
    }
    WhoIam() {
        return {
            name: "AutoHash",
            version: "1.0.0",
            this: this
        };
    }
    hash(k) {
        const secret = this.config[0].secret;
        let result = '';
        for (let i = 0; i < k.length; i++) {
            const charCode = k.charCodeAt(i) ^ secret.charCodeAt(i % secret.length);
            result += charCode.toString(16).padStart(2, '0');
        }
        return result;
    }
    unhash(hash) {
        const secret = this.config[0].secret;
        let result = '';
        for (let i = 0; i < hash.length; i += 2) {
            const hex = hash.slice(i, i + 2);
            const charCode = parseInt(hex, 16) ^ secret.charCodeAt((i / 2) % secret.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    }
    run(arg) {
        this.configChecker();
        return this.hash(arg);
    }
}
exports.default = AutoHash;
//# sourceMappingURL=hashing.js.map