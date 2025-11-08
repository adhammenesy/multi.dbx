"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginsData = void 0;
exports.PluginsData = new Map();
class Plugins {
    use(plugin) {
        const Data = plugin.WhoIam();
        if (exports.PluginsData.get(Data.name)) {
            console.warn(`"${Data.name}" Plugin Is Already Enabled, Skipped`);
            return this;
        }
        exports.PluginsData.set(Data.name, plugin);
        return this;
    }
    plugins() {
        return exports.PluginsData;
    }
}
exports.default = Plugins;
//# sourceMappingURL=plugins.js.map