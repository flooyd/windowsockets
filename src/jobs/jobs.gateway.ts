import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  Inject,
  Logger,
  LoggerService,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WebsocketExceptionsFilter } from 'src/filters/WebsocketExceptionsFilter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UsePipes(new ValidationPipe({ whitelist: true }))
export class JobsGateway {
  blah = 5;

  @WebSocketServer() server: Server;
  constructor(
    private readonly jobsService: JobsService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @UseFilters(new WebsocketExceptionsFilter('createJob'))
  @SubscribeMessage('createJob')
  create(
    @MessageBody()
    createJobDto: CreateJobDto,
  ) {
    this.logger.log(
      'CREATE: ' + JSON.stringify(createJobDto),
      JobsGateway.name,
    );
    return {
      event: 'createJob',
      data: createJobDto,
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

  @SubscribeMessage('findOneJob')
  findOne(@MessageBody() id: number) {
    this.server.emit('findOneJob', { stuff: 'stuff' });
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
