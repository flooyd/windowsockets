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
exports.LawnMowingSchema = exports.LawnMowing = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const job_1 = require("./classes/job");
let LawnMowing = class LawnMowing extends job_1.Job {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LawnMowing.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LawnMowing.prototype, "height", void 0);
LawnMowing = __decorate([
    (0, mongoose_1.Schema)()
], LawnMowing);
exports.LawnMowing = LawnMowing;
exports.LawnMowingSchema = mongoose_1.SchemaFactory.createForClass(LawnMowing).index({ email: 1, type: 1 }, { unique: true });
//# sourceMappingURL=lawnMowing.schema.js.map