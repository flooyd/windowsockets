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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
        data: import("./schemas/residentialWindowCleaning.schema").ResidentialWindowCleaning | import("./schemas/businessWindowCleaning.schema").BusinessWindowCleaning;
    }>;
    findAll(): WsResponse<CreateJobDto[]>;
    findJobCollection(): Promise<{
        event: string;
        data: string;
    } | {
        event: string;
        data: import("./schemas/jobCollection.schema").JobCollection & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAllOfType(type: String): Promise<(import("./schemas/jobCollection.schema").JobCollection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        event: string;
        data: string;
    }>;
    findOne(id: number): string;
    update(updateJobDto: UpdateJobDto): string;
    deleteAllJobsAndCollections(): Promise<{
        event: string;
        data: string;
    }>;
}
