import { CreateThingDto } from './createThing.dto';
declare const UpdateWsioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateThingDto>>;
export declare class UpdateWsioDto extends UpdateWsioDto_base {
    id: number;
}
export {};
