"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Création de l'instance Sequelize
const sequelize = new sequelize_1.Sequelize("zdfdgbej_regiecam", "zdfdgbej_regiecam", "wP6dMhE{,0", {
    host: "localhost",
    dialect: 'mysql'
});
exports.default = sequelize;
