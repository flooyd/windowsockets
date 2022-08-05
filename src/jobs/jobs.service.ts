import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import {
  ResidentialWindowCleaning,
  ResidentialWindowCleaningDocument,
} from './schemas/residentialWindowCleaning.schema';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(ResidentialWindowCleaning.name)
    private windowCleaningModel: Model<ResidentialWindowCleaningDocument>,
  ) {}

  create(createJobDto: CreateJobDto): Promise<ResidentialWindowCleaning> {
    const createdJob = new this.windowCleaningModel(createJobDto);
    return createdJob.save();
  }

  findAll() {
    return `This action returns all jobs`;
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
