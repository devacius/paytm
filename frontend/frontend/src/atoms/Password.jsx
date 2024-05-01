import { atom } from "recoil";
export const Password = atom({
    key: 'PasswordName', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });