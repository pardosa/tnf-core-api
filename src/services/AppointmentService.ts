import { Appointment } from "@/entities/Appointment";
import { Doctor } from "@/entities/Doctor";
import { BookAppointmentInput } from "@/models/appointments/BookAppointmentInput";
import { NotImplementedException } from "@/models/errors/NotImplementedException";
import { startOfDay, endOfDay } from "date-fns";
import { Service } from "typedi";
import { Between, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>
  ) {}

  getAppointments(): Promise<Appointment[]> {
    return this.appointmentRepo.find();
  }

  getAppointmentsByDoctor(
    doctorId: number,
    date: Date
  ): Promise<Appointment[]> {
    //const now = new Date(date);
    return this.appointmentRepo.find({
      where: {
        doctorId: doctorId,
        startTime: Between(
          startOfDay(date).toISOString(),
          endOfDay(date).toISOString()
        ),
      },
    });
  }

  getDoctorById(id: number): Promise<Doctor> {
    return this.doctorRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  bookAppointment(options: BookAppointmentInput): Promise<Appointment> {
    const now = new Date(options.date).toLocaleDateString();
    const newDate = now + " " + options.slot.start;
    const newAppointment = new Appointment();
    newAppointment.doctorId = options.slot.doctorId;
    newAppointment.patientname = options.patientName;
    newAppointment.startTime = new Date(newDate);
    newAppointment.description = options.description;
    return this.appointmentRepo.save(newAppointment);
    //throw new NotImplementedException("bookAppointment not implemented");
  }
}
