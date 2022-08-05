import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import {
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import { WebSocketExceptionsFilter } from 'src/filters/WebSocketExceptionsFilter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UsePipes(new ValidationPipe())
export class JobsGateway {
  constructor(
    private readonly jobsService: JobsService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @UseFilters(new WebSocketExceptionsFilter('createJob'))
  @SubscribeMessage('createJob')
  async create(
    @MessageBody()
    createJobDto: CreateJobDto,
  ) {
    this.logger.log(
      'CREATE: ' + JSON.stringify(createJobDto),
      JobsGateway.name,
    );

    const createdJob = await this.jobsService
      .create(createJobDto, 'floydtjones@gmail.com')
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    return {
      event: 'createJob',
      data: createdJob,
    };
  }

  @SubscribeMessage('findAllJobs')
  findAll(): WsResponse<CreateJobDto[]> {
    let jobs: CreateJobDto[] = [];
    return {
      event: 'findAllJobs',
      data: jobs,
    };
  }

  @UseFilters(new WebSocketExceptionsFilter('findJobCollection'))
  @SubscribeMessage('findJobCollection')
  async findJobCollection() {
    const jobCollection = await this.jobsService.findJobCollection(
      'floydtjones@gmail.com',
    );
    console.log(jobCollection);
    return {
      event: 'findJobCollection',
      data: jobCollection.toJSON(),
    };
  }

  @SubscribeMessage('findOneJob')
  findOne(@MessageBody() id: number) {
    return this.jobsService.findOne(id);
  }

  @SubscribeMessage('updateJob')
  update(@MessageBody() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(updateJobDto.id, updateJobDto);
  }

  @SubscribeMessage('removeJob')
  remove(@MessageBody() id: number) {
    return this.jobsService.remove(id);
  }
}
