import {Injectable, OnModuleInit} from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";

@Injectable()
export class AppService implements OnModuleInit{
    constructor(private sequelize: Sequelize){}

    async onModuleInit(): Promise<any> {
        await this.sequelize.sync({});
    }
}
