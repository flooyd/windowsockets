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
exports.JobCollectionSchema = exports.JobCollection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const businessWindowCleaning_schema_1 = require("./businessWindowCleaning.schema");
const residentialWindowCleaning_schema_1 = require("./residentialWindowCleaning.schema");
let JobCollection = class JobCollection {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobCollection.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'BusinessWindowCleaning' }),
    __metadata("design:type", businessWindowCleaning_schema_1.BusinessWindowCleaning)
], JobCollection.prototype, "business", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'ResidentialWindowCleaning' }),
    __metadata("design:type", residentialWindowCleaning_schema_1.ResidentialWindowCleaning)
], JobCollection.prototype, "residential", void 0);
JobCollection = __decorate([
    (0, mongoose_1.Schema)()
], JobCollection);
exports.JobCollection = JobCollection;
exports.JobCollectionSchema = mongoose_1.SchemaFactory.createForClass(JobCollection).index({ email: 1 }, { unique: true });
//# sourceMappingURL=jobCollection.schema.js.map