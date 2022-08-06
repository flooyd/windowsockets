"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const logger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('windowsback')),
            level: 'silly',
            eol: '\r\n',
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=util.js.map