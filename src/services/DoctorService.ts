import { Appointment } from "@/entities/Appointment";
import { Availability } from "@/entities/Availability";
import { Doctor } from "@/entities/Doctor";
import { Slot } from "@/models/appointments/Slot";
import { AddAvailabilityInput } from "@/models/doctor/AddAvailabilityInput";
import { AddDoctorInput } from "@/models/doctor/AddDoctorInput";
import { NotImplementedException } from "@/models/errors/NotImplementedException";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(Availability)
    private readonly availRepo: Repository<Availability>,
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>
  ) {}

  getDoctors() {
    return this.doctorRepo.find();
  }

  addDoctor(doctor: AddDoctorInput): Promise<Doctor> {
    const newDoctor = new Doctor();
    newDoctor.name = doctor.name;
    return this.doctorRepo.save(newDoctor);
    //throw new NotImplementedException("addDoctor: Not implemented!")
  }

  async getAvailablility(doctorId: number): Promise<Availability[]> {
    const availability = this.availRepo.find({
      where: {
        doctorId: doctorId,
      },
    });
    return availability;
    //throw new NotImplementedException("getAvailableSlots: Not implemented!");
  }

  async getAppointmentsByDoctor(doctorId: number): Promise<Appointment[]> {
    return this.appointmentRepo.find({
      where: {
        doctor: doctorId,
      },
    });
  }

  addDoctorAvailability(avail: AddAvailabilityInput): Promise<Availability> {
    const newAvail = new Availability();
    newAvail.dayOfWeek = avail.dayOfWeek;
    newAvail.doctorId = avail.doctorId;
    newAvail.startTimeUtc = avail.startTimeUtc;
    newAvail.endTimeUtc = avail.endTimeUtc;

    return this.availRepo.save(newAvail);
  }

  async getSlots(date: Date, doctorId: number): Promise<Availability[]> {
    const dayOfWeek = date.getDay();
    const availability = this.availRepo.find({
      where: {
        doctorId: doctorId,
        dayOfWeek: dayOfWeek,
      },
    });

    return availability;
  }
}
