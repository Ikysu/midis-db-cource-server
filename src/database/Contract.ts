import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DatabaseType,
} from "typeorm";

@Entity()
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_клиента: number;

  @Column()
  id_дилера: number;

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
