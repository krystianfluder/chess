import positions from "./positions";

const findPosition = (event, element) => {
  function procent(procent) {
    if (procent >= 87.5) return "87.5%";
    else if (procent >= 75) return "75%";
    else if (procent >= 62.5) return "62.5%";
    else if (procent >= 50) return "50%";
    else if (procent >= 37.5) return "37.5%";
    else if (procent >= 25) return "25%";
    else if (procent >= 12.5) return "12.5%";
    else if (procent >= 0) return "0%";
    else return 0;
  }
  const { left, top, width, height } = element.current.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  let procentX = (x / width) * 100;
  let procentY = (y / height) * 100;
  procentX = procent(procentX);
  procentY = procent(procentY);
  const positionsKeys = Object.keys(positions);
  const positionsValues = Object.values(positions);
  const searchIndex = positionsValues.findIndex(
    (item) => item.left === procentX && item.top === procentY
  );
  return positionsKeys[searchIndex];
};

export default findPosition;
