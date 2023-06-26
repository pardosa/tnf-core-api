import { Appointment } from "@/entities/Appointment";
import { Availability } from "@/entities/Availability";
import { Doctor } from "@/entities/Doctor";
import { Slot } from "@/models/appointments/Slot";
import { AddAvailabilityInput } from "@/models/doctor/AddAvailabilityInput";
import { AddDoctorInput } from "@/models/doctor/AddDoctorInput";
import { SlotInput } from "@/models/doctor/SlotInput";
import { NotImplementedException } from "@/models/errors/NotImplementedException";
import { DoctorService } from "@/services/DoctorService";
import { splitTime } from "@/utilities/time";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Query(() => [Doctor])
  async doctors(): Promise<Doctor[]> {
    return this.doctorService.getDoctors();
  }

  @Mutation(() => Doctor)
  async addDoctor(@Arg("doctor") doctor: AddDoctorInput): Promise<Doctor> {
    return this.doctorService.addDoctor(doctor);
  }

  @FieldResolver((returns) => [Availability])
  availability(@Root() doctor: Doctor): Promise<Availability[]> {
    return this.doctorService.getAvailablility(doctor.id);
  }

  @FieldResolver((returns) => [Appointment])
  appoinments(@Root() doctor: Doctor): Promise<Appointment[]> {
    return this.doctorService.getAppointmentsByDoctor(doctor.id);
  }

  @Mutation(() => Availability)
  async addDoctorAvailability(
    @Arg("availability") availability: AddAvailabilityInput
  ): Promise<Availability> {
    return this.doctorService.addDoctorAvailability(availability);
  }

  @Query(() => [Slot])
  async slots(@Arg("slotInput") slotInput: SlotInput): Promise<Slot[]> {
    const avails = this.doctorService.getSlots(
      new Date(slotInput.date),
      slotInput.doctorId
    );
    const slots: Slot[] = [];
    return avails.then((avs) => {
      avs.map((av) => {
        const times = splitTime(av.startTimeUtc, av.endTimeUtc, 15);
        times.map((tm: any) => {
          const start =
            slots.length === 0 ? av.startTimeUtc : slots[slots.length - 1].end;

          const tmp: Slot = {
            doctorId: 1,
            start: start,
            end: tm,
          };
          slots.push(tmp);
        });
      });
      return slots;
    });
  }
}
