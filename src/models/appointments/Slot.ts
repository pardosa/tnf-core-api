import { Field, InputType, ObjectType } from "type-graphql";

@InputType("SlotArgs")
@ObjectType()
export class Slot {
  @Field()
  doctorId: number;

  @Field()
  start: string;

  @Field()
  end: string;
}
