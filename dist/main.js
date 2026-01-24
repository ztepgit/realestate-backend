"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_session_1 = __importDefault(require("express-session"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.use((0, express_session_1.default)({
        secret: 'my-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        },
    }));
    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map