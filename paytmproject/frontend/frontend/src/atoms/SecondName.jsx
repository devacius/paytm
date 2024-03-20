import { atom } from "recoil";
export const SecondName = atom({
    key: 'SecondName', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });