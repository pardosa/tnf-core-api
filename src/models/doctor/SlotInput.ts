import { Doctor } from "@/entities/Doctor";
import { Field, InputType } from "type-graphql";

@InputType()
export class SlotInput {
  @Field()
  date: Date;

  @Field()
  doctorId: number;
}
