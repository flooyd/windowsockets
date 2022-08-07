"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const util_1 = require("./util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(util_1.default);
    util_1.default.log(`Listening on port ${process.env.PORT}`);
    await app.listen(process.env.PORT || 3000);
    global.things = [];
}
bootstrap();
//# sourceMappingURL=main.js.map