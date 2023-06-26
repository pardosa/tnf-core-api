import supertest from "supertest";

import { Api } from "../api";
import { SlotInput } from "@/models/doctor/SlotInput";

export const fetchSlots = (api: Api, slotInput: SlotInput): supertest.Test =>
  api.post("").send({
    query: `
      query slots ($slotInput: SlotInput!) {
        slots(slotInput: $slotInput) {
          doctorId
          start
          end
        }
      }
    `,
    variables: {
      slotInput,
    },
  });
