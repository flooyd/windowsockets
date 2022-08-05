import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
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

import { Server } from 'socket.io';

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
export class JobsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jobsService: JobsService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    this.server.emit('message', 'You are connected to The Gigs Site 😎');
    this.server.emit('message', 'A user has connected');
  }

  handleDisconnect(client: any) {
    this.server.emit('message', 'A user has disconnected ☹️');
  }

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
    this.logger.log('FIND_JOB_COLLECTION:', JobsGateway.name);
    const jobCollection = await this.jobsService.findJobCollection(
      'floydtjones@gmail.com',
    );
    if (!jobCollection) {
      return {
        event: 'findJobCollection',
        data: 'No collection could be found!!!',
      };
    }
    return {
      event: 'findJobCollection',
      data: jobCollection.toJSON(),
    };
  }

  @UseFilters(new WebSocketExceptionsFilter('findAllOfType'))
  @SubscribeMessage('findAllOfType')
  async findAllOfType(@MessageBody() type: String) {
    this.logger.log('FIND_ALL_OF_TYPE: ' + type, JobsGateway.name);

    const jobCollections = await this.jobsService.findAllOfType(type);

    if (!jobCollections) {
      return {
        event: 'findAllOfType',
        data: 'No collection could be found!!!',
      };
    }

    return jobCollections;
  }

  @SubscribeMessage('findOneJob')
  findOne(@MessageBody() id: number) {
    return this.jobsService.findOne(id);
  }

  @SubscribeMessage('updateJob')
  update(@MessageBody() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(updateJobDto.id, updateJobDto);
  }

  @SubscribeMessage('deleteAllJobsAndCollections')
  async deleteAllJobsAndCollections() {
    await this.jobsService.deleteAllJobsAndCollections();

    return {
      event: 'deleteAllJobsAndCollections',
      data: 'All jobs and collections have been deleted.',
    };
  }
}
