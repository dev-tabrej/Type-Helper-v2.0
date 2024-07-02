import { atom } from "recoil";
const practiceType = atom({
  key: "practiceType",
  default: "common",
});

const time = atom({
  key: "time",
  default: 60,
});
export { practiceType, time };
