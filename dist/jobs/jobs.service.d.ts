/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Schema } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { BusinessWindowCleaning, BusinessWindowCleaningDocument } from './schemas/businessWindowCleaning.schema';
import { JobCollection, JobCollectionDocument } from './schemas/jobCollection.schema';
import { ResidentialWindowCleaning, ResidentialWindowCleaningDocument } from './schemas/residentialWindowCleaning.schema';
export declare class JobsService {
    private jobCollectionModel;
    private businessCleaningModel;
    private residentialCleaningModel;
    constructor(jobCollectionModel: Model<JobCollectionDocument>, businessCleaningModel: Model<BusinessWindowCleaningDocument>, residentialCleaningModel: Model<ResidentialWindowCleaningDocument>);
    create(createJobDto: CreateJobDto, email: any): Promise<BusinessWindowCleaning | ResidentialWindowCleaning>;
    createCollection(email: any, jobType: any, jobId: any): Promise<void>;
    createBusinessWindowCleaning(createJobDto: CreateJobDto, email: any): Promise<{
        createdJob: BusinessWindowCleaning;
        id: Schema.Types.ObjectId;
    }>;
    createResidentialWindowCleaning(createJobDto: CreateJobDto, email: any): Promise<{
        createdJob: ResidentialWindowCleaning;
        id: Schema.Types.ObjectId;
    }>;
    buildJobObject(createJobDto: any, email: any): any;
    findAllOfType(type: any): Promise<(JobCollection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findJobCollection(email: any): Promise<JobCollection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteAllJobsAndCollections(): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateJobDto: UpdateJobDto): string;
    remove(id: number): string;
}
