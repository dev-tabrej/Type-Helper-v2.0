import { atom } from "recoil";
const practiceTypeAtom = atom({
  key: "practiceTypeAtom",
  default: "common",
});

const time = atom({
  key: "timeAtom",
  default: 60,
});
export { practiceTypeAtom, time };
