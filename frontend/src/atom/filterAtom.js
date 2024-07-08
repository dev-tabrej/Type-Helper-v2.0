import { atom } from "recoil";
const practiceType = atom({
  key: "practiceType",
  default: "common",
});

const time = atom({
  key: "time",
  default: 5,
});
export { practiceType, time };
