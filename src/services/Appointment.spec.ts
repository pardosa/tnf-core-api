import { Appointment } from "@/entities/Appointment";
import createMockRepo from "@test/mocks/mockRepo";
import { plainToClass } from "class-transformer";
import Container from "typedi";
import { ConnectionManager, Repository } from "typeorm";

const doctorid = 1;
const appointment: Appointment = plainToClass(Appointment, {
  doctorId: doctorid,
  startTime: "2023-06-28 15:30:00",
  patientname: "patient",
});

const mockAppointmentRepo = {
  find: jest.fn(() => Promise.resolve([appointment])),
  findOne: jest.fn(() => Promise.resolve(appointment)),
};

describe("AppointmentService", () => {
  const mockedAppointmentService = {
    getAppointments: jest.fn(async () => mockAppointmentRepo.find()),
    getAppointmentsByDoctor: jest.fn(async () => mockAppointmentRepo.findOne()),
  };

  // beforeAll(() => {
  //   //Container.set(ConnectionManager, createMockRepo(mockRepo));
  // });

  describe("query appointments", () => {
    it("should return list of doctor's appointments", async () => {
      const data = await mockedAppointmentService.getAppointments();

      expect(mockedAppointmentService.getAppointments).toHaveBeenCalledTimes(1);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].doctorId).toBe(1);
    });
  });

  describe("bookAppointment", () => {
    it("should not book duplicate appointment", async () => {});
  });
});
