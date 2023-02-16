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
  дата_заключения_договора: number;

  @Column()
  марка_автомобиля: string;

  @Column()
  фото_автомобиля: string;

  @Column()
  дата_выпуска: string;

  @Column()
  пробег: number;

  @Column()
  дата_продажи: string;

  @Column()
  цена_продажи: number;

  @Column()
  размер_комиссионных: number;

  @Column()
  примечание: string;
}
