import { errorTypes } from "../types";

const set = (error) => {
  return {
    type: errorTypes.ERROR_SET,
    error,
  };
};

const remove = () => {
  return {
    type: errorTypes.ERROR_HIDE,
  };
};

export default {
  set,
  remove,
};
