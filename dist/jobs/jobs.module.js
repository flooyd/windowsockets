"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jobs_service_1 = require("./jobs.service");
const jobs_gateway_1 = require("./jobs.gateway");
const residentialWindowCleaning_schema_1 = require("./schemas/residentialWindowCleaning.schema");
const jobCollection_schema_1 = require("./schemas/jobCollection.schema");
const businessWindowCleaning_schema_1 = require("./schemas/businessWindowCleaning.schema");
let JobsModule = class JobsModule {
};
JobsModule = __decorate([
    (0, common_1.Module)({
        providers: [jobs_gateway_1.JobsGateway, jobs_service_1.JobsService, common_1.Logger],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: jobCollection_schema_1.JobCollection.name,
                    schema: jobCollection_schema_1.JobCollectionSchema,
                },
                {
                    name: residentialWindowCleaning_schema_1.ResidentialWindowCleaning.name,
                    schema: residentialWindowCleaning_schema_1.ResidentialWindowCleaningSchema,
                },
                {
                    name: businessWindowCleaning_schema_1.BusinessWindowCleaning.name,
                    schema: businessWindowCleaning_schema_1.BusinessWindowCleaningSchema,
                },
            ]),
        ],
    })
], JobsModule);
exports.JobsModule = JobsModule;
//# sourceMappingURL=jobs.module.js.map