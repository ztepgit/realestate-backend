"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFavoriteSchema = exports.CreateFavoriteSchema = void 0;
const zod_1 = require("zod");
exports.CreateFavoriteSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive('User ID must be a positive integer'),
    propertyId: zod_1.z
        .number()
        .int()
        .positive('Property ID must be a positive integer'),
});
exports.DeleteFavoriteSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive('User ID must be a positive integer'),
    propertyId: zod_1.z
        .number()
        .int()
        .positive('Property ID must be a positive integer'),
});
//# sourceMappingURL=favorite.dto.js.map