import { CreateThingDto } from './dto/createThing.dto';
import { UpdateWsioDto } from './dto/update-wsio.dto';
export declare class WsioService {
    create(createThingDto: CreateThingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWsioDto: UpdateWsioDto): string;
    remove(id: number): string;
}
