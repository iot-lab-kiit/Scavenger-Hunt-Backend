import { createResponse } from "../../respo.js";
import { STATUS_OK } from "../constants/index.js";

export default function credits(req, res) {
  res.send(
    createResponse(STATUS_OK, {
      organisers: [
        {
          name: "Vaibhav Tiwari",
          roll: "21051527",
        },
        {
          name: "Anshul Kumar",
          roll: "2105865",
        },
        {
          name: "Bora Dhruv Singh",
          roll: "21052561",
        },
        {
          name: "Vaibhav Gupta",
          roll: "2128110",
        },
        {
          name: "Avishikta Majumder",
          roll: "21052063",
        },
        {
          name: "Pratibh Sinha",
          roll: "2106043",
        },
        {
          name: "Ankit Sahoo",
          roll: "2106300",
        },
        {
          name: "Anirban Basak",
          roll: "21051880",
        },
      ],
      developers: {
        backend: [
          {
            name: "Kumar Priyanshu",
            github: "https://github.com/kpriyanshu2003",
            linkedin: "https://www.linkedin.com/in/kpriyanshu2003/",
          },
          {
            name: "Akangkha Sarkar",
            github: "",
            linkedin: "",
          },
          {
            name: "Shashank Raj",
            github: "",
            linkedin: "",
          },
        ],
        app: [
          {
            name: "Abhranil Dasgupta",
            github: "",
            linkedin: "",
          },
          {
            name: "Anirban Basak",
            github: "",
            linkedin: "",
          },
          {
            name: "Vaibhav Raj",
            github: "",
            linkedin: "",
          },
          {
            name: "Anirudh Sharma",
            github: "",
            linkedin: "",
          },
        ],
        ui: [
          {
            name: "Bibek Das",
            github: "",
            linkedin: "",
          },
        ],
      },
    })
  );
}
