"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.add = exports.blah = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
exports.blah = [];
exports.blah.push(5);
const add = (item) => {
    exports.blah = [...exports.blah, item];
};
exports.add = add;
const deleteAll = () => {
    exports.blah = [];
};
exports.deleteAll = deleteAll;
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