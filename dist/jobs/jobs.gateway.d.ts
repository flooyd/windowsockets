import { WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { LoggerService } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jobsService;
    private readonly logger;
    constructor(jobsService: JobsService, logger: LoggerService);
    server: Server;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: any): void;
    create(createJobDto: CreateJobDto): Promise<{
        event: string;
        data: import("./schemas/businessWindowCleaning.schema").BusinessWindowCleaning | import("./schemas/residentialWindowCleaning.schema").ResidentialWindowCleaning;
    }>;
    findAll(): WsResponse<CreateJobDto[]>;
    chat(client: Socket, data: string): {};
    findJobCollection(): Promise<{
        event: string;
        data: string;
    } | {
        event: string;
        data: import("./schemas/jobCollection.schema").JobCollection & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAllOfType(type: String): Promise<{
        event: string;
        data: string;
    } | {
        event: string;
        data: (import("./schemas/jobCollection.schema").JobCollection & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findOne(id: number): string;
    update(updateJobDto: UpdateJobDto): string;
    deleteAllJobsAndCollections(): Promise<{
        event: string;
        data: string;
    }>;
}
