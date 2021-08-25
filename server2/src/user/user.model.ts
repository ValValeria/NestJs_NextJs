import {Column, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    tableName: "user_nestjs"
})
export class User extends Model {
    @PrimaryKey
    @Column
    id: number;

    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}