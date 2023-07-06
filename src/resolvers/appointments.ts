import { Appointment } from "@/entities/Appointment";
import { Availability } from "@/entities/Availability";
import { Doctor } from "@/entities/Doctor";
import { BookAppointmentInput } from "@/models/appointments/BookAppointmentInput";
import { SlotInput } from "@/models/doctor/SlotInput";
import { NotImplementedException } from "@/models/errors/NotImplementedException";
import { AppointmentService } from "@/services/AppointmentService";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Query(() => [Appointment])
  async appointments(): Promise<Appointment[]> {
    return this.appointmentService.getAppointments();
  }

  @Query(() => [Appointment])
  async doctorAppointments(
    @Arg("slotInput") slotInput: SlotInput
  ): Promise<Appointment[]> {
    return this.appointmentService.getAppointmentsByDoctor(
      slotInput.doctorId,
      slotInput.date
    );
  }

  @Mutation(() => Appointment)
  async bookAppointment(
    @Arg("bookAppointmentInput") bookAppointmentInput: BookAppointmentInput
  ): Promise<Appointment> {
    const appointments = await this.appointmentService.getAppointmentsByDoctor(
      bookAppointmentInput.slot.doctorId,
      bookAppointmentInput.date
    );

    let isBooked = false;
    appointments.map((app) => {
      if (
        new Date(app.startTime).toLocaleTimeString("en-GB") ===
        bookAppointmentInput.slot.start + ":00"
      ) {
        isBooked = true;
      }
    });

    if (!isBooked) {
      return this.appointmentService.bookAppointment(bookAppointmentInput);
    } else {
      throw new NotImplementedException("Slot has been booked");
    }
  }

  @FieldResolver((returns) => Doctor)
  async doctor(@Root() availability: Availability): Promise<Doctor> {
    return this.appointmentService.getDoctorById(availability.doctorId);
  }
}
