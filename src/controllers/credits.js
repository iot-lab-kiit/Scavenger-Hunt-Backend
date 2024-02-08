import { createResponse } from "../../respo.js";

export default function credits(req, res) {
  res.send(
    createResponse(1, {
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
