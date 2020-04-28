import { errorTypes } from "../types";

const set = (error) => {
  return {
    type: errorTypes.set,
    error,
  };
};

const remove = () => {
  return {
    type: errorTypes.remove,
  };
};

export default {
  set,
  remove,
};
