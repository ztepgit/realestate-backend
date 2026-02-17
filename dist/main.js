"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = require("pg");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const isProd = process.env.NODE_ENV === 'production';
    const server = app.getHttpAdapter().getInstance();
    server.set('trust proxy', 1);
    const dbPool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    });
    const PGStore = (0, connect_pg_simple_1.default)(express_session_1.default);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use((0, express_session_1.default)({
        store: new PGStore({
            pool: dbPool,
            tableName: 'session',
            createTableIfMissing: true,
        }),
        name: 'connect.sid',
        secret: process.env.SESSION_SECRET || 'my-secret-key',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
        },
    }));
    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log(`Server running on ${isProd ? 'production' : 'local'} port ${port}`);
}
bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map