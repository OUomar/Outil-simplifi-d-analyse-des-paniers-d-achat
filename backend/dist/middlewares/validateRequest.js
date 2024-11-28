"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateProduct = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        sales: joi_1.default.number().default(0)
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.default = validateProduct;
