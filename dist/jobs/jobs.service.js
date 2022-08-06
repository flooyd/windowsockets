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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const businessWindowCleaning_schema_1 = require("./schemas/businessWindowCleaning.schema");
const jobCollection_schema_1 = require("./schemas/jobCollection.schema");
const residentialWindowCleaning_schema_1 = require("./schemas/residentialWindowCleaning.schema");
let JobsService = class JobsService {
    constructor(jobCollectionModel, businessCleaningModel, residentialCleaningModel) {
        this.jobCollectionModel = jobCollectionModel;
        this.businessCleaningModel = businessCleaningModel;
        this.residentialCleaningModel = residentialCleaningModel;
    }
    async create(createJobDto, email) {
        let createdJob = null;
        let id;
        let result;
        switch (createJobDto.type) {
            case 'business':
                result = await this.createBusinessWindowCleaning(createJobDto, email);
                break;
            case 'residential':
                result = await this.createResidentialWindowCleaning(createJobDto, email);
                break;
            default:
                break;
        }
        createdJob = result.createdJob;
        id = result.id;
        let jobCollection = await this.jobCollectionModel.findOne({ email });
        if (jobCollection === null) {
            console.log(createdJob);
            await this.createCollection(email, createdJob.type, id);
            jobCollection = await this.jobCollectionModel.findOne({ email });
        }
        else {
            jobCollection[createdJob.type] = id;
            await jobCollection.save();
        }
        return createdJob;
    }
    async createCollection(email, jobType, jobId) {
        const createdCollection = new this.jobCollectionModel({
            email,
            [jobType]: jobId,
        });
        await createdCollection.save();
    }
    async createBusinessWindowCleaning(createJobDto, email) {
        let object = this.buildJobObject(createJobDto, email);
        let createdJob = await this.businessCleaningModel.create(object);
        return { createdJob, id: createdJob.id };
    }
    async createResidentialWindowCleaning(createJobDto, email) {
        let object = this.buildJobObject(createJobDto, email);
        let createdJob = await this.residentialCleaningModel.create(object);
        return { createdJob, id: createdJob.id };
    }
    buildJobObject(createJobDto, email) {
        return Object.assign(Object.assign({}, createJobDto), { paid: false, invoiced: false, email });
    }
    async findAllOfType(type) {
        let jobCollections = await this.jobCollectionModel.find({ type });
        if (!jobCollections || jobCollections.length === 0) {
            return null;
        }
        return jobCollections;
    }
    async findJobCollection(email) {
        let jobCollection = await this.jobCollectionModel.findOne({
            email,
        });
        if (jobCollection) {
            console.log(jobCollection);
            jobCollection = await jobCollection.populate('business residential');
            console.log(jobCollection);
        }
        return jobCollection;
    }
    async deleteAllJobsAndCollections() {
        await this.jobCollectionModel.deleteMany({});
        await this.businessCleaningModel.deleteMany({});
        await this.residentialCleaningModel.deleteMany({});
        return;
    }
    findOne(id) {
        return `This action returns a #${id} job`;
    }
    update(id, updateJobDto) {
        return `This action updates a #${id} job`;
    }
    remove(id) {
        return `This action removes a #${id} job`;
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(jobCollection_schema_1.JobCollection.name)),
    __param(1, (0, mongoose_1.InjectModel)(businessWindowCleaning_schema_1.BusinessWindowCleaning.name)),
    __param(2, (0, mongoose_1.InjectModel)(residentialWindowCleaning_schema_1.ResidentialWindowCleaning.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map