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

const toggleSpinner = (bool) => {
  return {
    type: commonTypes.COMMON_TOGGLE_SPINNER,
    bool,
  };
};

export default {
  setMessage,
  removeMessage,
  toggleSpinner,
};
