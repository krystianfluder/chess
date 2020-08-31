const save = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

const get = (name) => {
  const data = localStorage.getItem(name);
  if (data !== null) {
    return JSON.parse(data);
  }
  return null;
};

const remove = (name) => {
  localStorage.removeItem(name);
};

export default { save, get, remove };
