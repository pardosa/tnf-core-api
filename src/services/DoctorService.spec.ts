import { Doctor } from "@/entities/Doctor";
import createMockRepo from "@test/mocks/mockRepo";
import Container from "typedi";
import { ConnectionManager, createConnection, getConnection } from "typeorm";
import { splitTime } from "@/utilities/time";
import { Availability } from "@/entities/Availability";
import { plainToClass } from "class-transformer";
import { Appointment } from "@/entities/Appointment";

const doctorid = 1;
const doctor: Doctor = plainToClass(Doctor, {
  name: "susi",
  id: 1,
});

const avail: Availability = plainToClass(Availability, {
  doctorId: doctorid,
  dayOfWeek: 1,
  startTimeUtc: "11:00:00",
  endTimeUtc: "11:15:00",
});

const mockDoctorRepo = {
  find: jest.fn(() => Promise.resolve([doctor])),
};

const mockAvailabilityRepo = {
  find: jest.fn(() => Promise.resolve([avail])),
};

describe("DoctorService", () => {
  const mockedDoctorService = {
    getSlot: jest.fn(() => Promise.resolve(["11:00"])),
    getAvailability: jest.fn(async () => mockAvailabilityRepo.find()),
    getDoctors: jest.fn(() => mockDoctorRepo.find()),
  };

  // beforeAll(async () => {
  //   Container.set(ConnectionManager, createMockRepo(mockDoctorRepo));
  //   await createConnection();
  // });

  // afterAll(async () => {
  //   await getConnection().close();
  // });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("slots and doctor query", () => {
    it("should return all slots for doctor", async () => {
      const start = "11:00";
      const end = "15:00";

      const result = "11:15";
      const func = splitTime(start, end, 15);
      expect(func[0]).toBe(result);
    });

    it("should return doctors list", async () => {
      const data = await mockedDoctorService.getDoctors();

      expect(mockedDoctorService.getDoctors).toHaveBeenCalledTimes(1);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toBe("susi");
    });

    it("should return doctor's availibilivty", async () => {
      const data = await mockedDoctorService.getAvailability();

      expect(mockedDoctorService.getAvailability).toHaveBeenCalledTimes(1);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].startTimeUtc).toBe("11:00:00");
    });
  });
});
