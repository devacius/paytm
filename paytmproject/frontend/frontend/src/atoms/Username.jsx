import { atom } from "recoil";
export const Username = atom({
    key: 'Username', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });