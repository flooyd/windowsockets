import { Document, Model, Schema } from 'mongoose';
import { BusinessWindowCleaning } from './businessWindowCleaning.schema';
import { ResidentialWindowCleaning } from './residentialWindowCleaning.schema';
export declare type JobCollectionDocument = JobCollection & Document;
export declare class JobCollection {
    email: string;
    business: BusinessWindowCleaning;
    residential: ResidentialWindowCleaning;
}
export declare const JobCollectionSchema: Schema<JobCollection, Model<JobCollection, any, any, any, any>, {}, {}, {}, {}, "type", JobCollection>;
