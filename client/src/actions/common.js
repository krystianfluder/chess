import { commonTypes } from "../types";

const setMessage = (message) => {
  return {
    type: commonTypes.COMMON_SET_MESSAGE,
    message,
  };
};

const removeMessage = () => {
  return {
    type: commonTypes.COMMON_REMOVE_MESSAGE,
  };
};

export default {
  setMessage,
  removeMessage,
};
