import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({
  tableName: 'conversation',
})
export class Conversation extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  message: string;

  @BelongsTo(() => User)
  sender: User;

  @BelongsTo(() => User)
  receiver: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  senderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  receiverId: number;
}
