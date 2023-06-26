import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctor } from "./Doctor";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Availability extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  dayOfWeek: number;

  @Field()
  @Column()
  startTimeUtc: string;

  @Field()
  @Column()
  endTimeUtc: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.availability)
  @Field((type) => Doctor)
  doctor: Doctor;

  @Field((type) => Int)
  @Column()
  doctorId: number;
}
