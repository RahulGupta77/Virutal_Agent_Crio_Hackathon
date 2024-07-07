import { Message } from "../interface/Types";

export const conversation = [
  { id: "1293", title: "what is qkart", messagesId: ["1", "2", "3"] },
  { id: "123", title: "what  qkart", messagesId: ["1", "2", "3"] },
  { id: "193", title: "how is use Vs code", messagesId: ["1", "2", "3"] },
  { id: "13", title: "what is workspace", messagesId: ["1", "2", "3"] },
];

export const message: Message[] = [
  { id: "1", message: "omkar", senderId: "bot" },
  { id: "2", message: "there is something", senderId: "omkar" },
  { id: "3", message: "there nothing", senderId: "bot" },
  { id: "4", message: "no one is there", senderId: "bot" },
];

export const sprintManager = [
  {
    sprintName: "mern1",
    microExperience: ["Q-Kart Frontend (Hooks)"],
    module: ["introduction", "getting started", "authentication"],
    milestone: [
      "introduction",
      "overview",
      "setup your workspace",
      "start the application",
      "understand the project file",
    ],
  },
  {
    sprintName: "sales",
    microExperience: [],
    module: [],
    milestone: [],
  },
];
