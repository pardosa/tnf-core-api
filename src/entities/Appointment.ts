import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctor } from "./Doctor";

@ObjectType()
@Entity()
export class Appointment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;

  @Field((type) => Int)
  @Column()
  doctorId: number;

  @Field()
  @CreateDateColumn()
  startTime: Date;

  @Field()
  @Column({
    default: 15,
  })
  durationMinutes: number;

  @Field()
  @Column()
  patientname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;
}
