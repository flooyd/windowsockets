import { Injectable } from '@nestjs/common';
import { InjectModel, Prop } from '@nestjs/mongoose';

import { Model, Schema } from 'mongoose';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import {
  BusinessWindowCleaning,
  BusinessWindowCleaningDocument,
} from './schemas/businessWindowCleaning.schema';
import {
  JobCollection,
  JobCollectionDocument,
} from './schemas/jobCollection.schema';
import {
  ResidentialWindowCleaning,
  ResidentialWindowCleaningDocument,
} from './schemas/residentialWindowCleaning.schema';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobCollection.name)
    private jobCollectionModel: Model<JobCollectionDocument>,
    @InjectModel(BusinessWindowCleaning.name)
    private businessCleaningModel: Model<BusinessWindowCleaningDocument>,
    @InjectModel(ResidentialWindowCleaning.name)
    private residentialCleaningModel: Model<ResidentialWindowCleaningDocument>,
  ) {}

  async create(
    createJobDto: CreateJobDto,
    email,
  ): Promise<BusinessWindowCleaning | ResidentialWindowCleaning> {
    let createdJob: BusinessWindowCleaning | ResidentialWindowCleaning | null =
      null;
    let id;
    let result;

    //'lawn, car, carWindows, residential, business']
    switch (createJobDto.type) {
      case 'business':
        result = await this.createBusinessWindowCleaning(createJobDto, email);
        break;
      case 'residential':
        result = await this.createResidentialWindowCleaning(
          createJobDto,
          email,
        );
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
    } else {
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

  async createBusinessWindowCleaning(
    createJobDto: CreateJobDto,
    email,
  ): Promise<{
    createdJob: BusinessWindowCleaning;
    id: Schema.Types.ObjectId;
  }> {
    let object = this.buildJobObject(createJobDto, email);
    let createdJob = await this.businessCleaningModel.create(object);
    return { createdJob, id: createdJob.id };
  }

  async createResidentialWindowCleaning(
    createJobDto: CreateJobDto,
    email,
  ): Promise<{
    createdJob: ResidentialWindowCleaning;
    id: Schema.Types.ObjectId;
  }> {
    let object = this.buildJobObject(createJobDto, email);
    let createdJob = await this.residentialCleaningModel.create(object);
    return { createdJob, id: createdJob.id };
  }

  buildJobObject(createJobDto, email) {
    return {
      ...createJobDto,
      paid: false,
      invoiced: false,
      email,
    };
  }

  findAll() {
    return `This action returns all jobs`;
  }

  async findJobCollection(email) {
    const jobCollection = await (
      await this.jobCollectionModel.findOne({ email })
    ).populate('business residential');
    return jobCollection;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
