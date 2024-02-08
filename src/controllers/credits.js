import { createResponse } from "../../respo.js";
import { STATUS_OK } from "../constants/index.js";

export default function credits(req, res) {
  res.send(
    createResponse(STATUS_OK, {
      title: "Credits",
      backend: { dev1: "Priyanshu", dev2: "Akangkha", dev3: "Shashank" },
      app: {
        dev1: "Abhranil",
        dev2: "Bibek",
        dev3: "Anirban",
        dev4: "Vaibhav",
      },
    })
  );
}
