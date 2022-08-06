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
var JobsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const jobs_service_1 = require("./jobs.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const update_job_dto_1 = require("./dto/update-job.dto");
const WebSocketExceptionsFilter_1 = require("../filters/WebSocketExceptionsFilter");
let JobsGateway = JobsGateway_1 = class JobsGateway {
    constructor(jobsService, logger) {
        this.jobsService = jobsService;
        this.logger = logger;
    }
    handleConnection(client, ...args) {
        client.emit('selfConnect', 'You are connected to The Gigs Site 😎');
        client.broadcast.emit('userConnect', 'A user has connected');
    }
    handleDisconnect(client) {
        this.server.emit('userDisconnect', 'A user has disconnected ☹️');
    }
    async create(createJobDto) {
        this.logger.log('CREATE: ' + JSON.stringify(createJobDto), JobsGateway_1.name);
        const createdJob = await this.jobsService
            .create(createJobDto, 'floydtjones@gmail.com')
            .catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
        return {
            event: 'createJob',
            data: createdJob,
        };
    }
    findAll() {
        let jobs = [];
        return {
            event: 'findAllJobs',
            data: jobs,
        };
    }
    async findJobCollection() {
        this.logger.log('FIND_JOB_COLLECTION:', JobsGateway_1.name);
        const jobCollection = await this.jobsService.findJobCollection('floydtjones@gmail.com');
        if (!jobCollection) {
            return {
                event: 'findJobCollection',
                data: 'No collection could be found!!!',
            };
        }
        return {
            event: 'findJobCollection',
            data: jobCollection,
        };
    }
    async findAllOfType(type) {
        this.logger.log('FIND_ALL_OF_TYPE: ' + type, JobsGateway_1.name);
        const jobCollections = await this.jobsService.findAllOfType(type);
        if (!jobCollections) {
            return {
                event: 'findAllOfType',
                data: 'No collection could be found!!!',
            };
        }
        return jobCollections;
    }
    findOne(id) {
        return this.jobsService.findOne(id);
    }
    update(updateJobDto) {
        return this.jobsService.update(updateJobDto.id, updateJobDto);
    }
    async deleteAllJobsAndCollections() {
        await this.jobsService.deleteAllJobsAndCollections();
        return {
            event: 'deleteAllJobsAndCollections',
            data: 'All jobs and collections have been deleted.',
        };
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], JobsGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseFilters)(new WebSocketExceptionsFilter_1.WebSocketExceptionsFilter('createJob')),
    (0, websockets_1.SubscribeMessage)('createJob'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobsGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllJobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], JobsGateway.prototype, "findAll", null);
__decorate([
    (0, common_1.UseFilters)(new WebSocketExceptionsFilter_1.WebSocketExceptionsFilter('findJobCollection')),
    (0, websockets_1.SubscribeMessage)('findJobCollection'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsGateway.prototype, "findJobCollection", null);
__decorate([
    (0, common_1.UseFilters)(new WebSocketExceptionsFilter_1.WebSocketExceptionsFilter('findAllOfType')),
    (0, websockets_1.SubscribeMessage)('findAllOfType'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsGateway.prototype, "findAllOfType", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findOneJob'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JobsGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateJob'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", void 0)
], JobsGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteAllJobsAndCollections'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsGateway.prototype, "deleteAllJobsAndCollections", null);
JobsGateway = JobsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(1, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [jobs_service_1.JobsService, Object])
], JobsGateway);
exports.JobsGateway = JobsGateway;
//# sourceMappingURL=jobs.gateway.js.map