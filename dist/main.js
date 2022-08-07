"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const util_1 = require("./util");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(util_1.default);
    util_1.default.log(`Listening on port ${process.env.PORT}`);
    const cache = app.get(common_1.CACHE_MANAGER);
    await cache.set('things', [], { ttl: 0 });
    console.log(util_1.blah);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map