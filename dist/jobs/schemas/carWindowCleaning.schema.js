"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarWindowCleaningSchema = exports.CarWindowCleaning = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const job_1 = require("./classes/job");
let CarWindowCleaning = class CarWindowCleaning extends job_1.Job {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], CarWindowCleaning.prototype, "outsideOnly", void 0);
CarWindowCleaning = __decorate([
    (0, mongoose_1.Schema)()
], CarWindowCleaning);
exports.CarWindowCleaning = CarWindowCleaning;
exports.CarWindowCleaningSchema = mongoose_1.SchemaFactory.createForClass(CarWindowCleaning).index({ email: 1, type: 1 }, { unique: true });
//# sourceMappingURL=carWindowCleaning.schema.js.map