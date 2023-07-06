import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { Availability } from "./Availability";

@ObjectType()
@Entity()
export class Doctor extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Availability, (availability) => availability.doctor, {
    nullable: true,
  })
  @Field((type) => [Availability], { nullable: true })
  availability?: Availability[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
    nullable: true,
  })
  @Field((type) => [Appointment], { nullable: true })
  appointments?: Appointment[];
}
