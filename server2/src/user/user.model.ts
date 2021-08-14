import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: "user_nestjs"
})
export class User extends Model {
    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}