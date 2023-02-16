import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DatabaseType,
  OneToOne,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { DataTypeDefaults } from "typeorm/driver/types/DataTypeDefaults";
import { Client } from "./Client";
import { Dealer } from "./Dealer";

@Entity()
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client)
  @JoinTable()
  клиент: Client;

  @ManyToOne(() => Dealer, (dealer) => dealer)
  @JoinTable()
  дилер: Dealer;

  @Column()
  дата_заключения_договора: Date;

  @Column()
  марка_автомобиля: string;

  @Column({type: "text"})
  фото_автомобиля: string;

  @Column()
  дата_выпуска: Date;

  @Column()
  пробег: number;

  @Column()
  дата_продажи: Date;

  @Column()
  цена_продажи: number;

  @Column()
  размер_комиссионных: number;

  @Column()
  примечание: string;
}
