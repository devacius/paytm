import { atom } from "recoil";
export const FirstName = atom({
    key: 'FirstName', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });