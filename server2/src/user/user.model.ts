import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IBaseUser } from '../interfaces';

@Table({
  tableName: 'user_nestjs',
})
export class User extends Model implements IBaseUser {
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

  @Column({ defaultValue: '' })
  image: string;
}
