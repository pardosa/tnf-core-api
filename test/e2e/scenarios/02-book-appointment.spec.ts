import { faker } from "@faker-js/faker";

import { createApi } from "../api";

import { fetchSlots } from "../commands/doctors";
import { bookAppointment } from "../commands/appointments";
import { BookAppointmentInput } from "@/models/appointments/BookAppointmentInput";
import { Appointment } from "@/entities/Appointment";
import { Slot } from "@/models/appointments/Slot";
import { SlotInput } from "@/models/doctor/SlotInput";

const api = createApi();

describe("Book appointment scenario", () => {
  it("should book appointment successfully", async () => {
    const date = "6/26/2023";
    const slotInput: SlotInput = {
      doctorId: 2,
      date: new Date(date),
    };

    const slotsRes = await fetchSlots(api, slotInput);
    const slots = slotsRes.body.data.slots as Slot[];
    const selectedSlot = slots[0];

    const bookAppointmentInput: BookAppointmentInput = {
      slot: selectedSlot,
      patientName: faker.name.firstName(),
      description: faker.lorem.lines(5),
      date: new Date(date),
    };

    const appointmentRes = await bookAppointment(api, bookAppointmentInput);
    const appointment = appointmentRes.body.data.bookAppointment as Appointment;

    const now = new Date(date).toLocaleDateString();
    const newDate = now + " " + selectedSlot.start;
    const start = new Date(newDate);

    expect(new Date(appointment.startTime).toISOString()).toBe(
      start.toISOString()
    );
    expect(appointment.doctorId).toBe(selectedSlot.doctorId);
  });
});
