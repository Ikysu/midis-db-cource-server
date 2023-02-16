import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  фамилия: string;

  @Column()
  имя: string;

  @Column()
  отчество: string;

  @Column()
  город: string;

  @Column()
  адрес: string;

  @Column()
  телефон: string;
}
