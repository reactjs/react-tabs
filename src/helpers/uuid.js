// Get a universally unique identifier
let count = 0;
export default function uuid(className) {
  if (!className || className === '') return `react-tabs-${count++}`;
  else return `react-tabs-${count++}-${className}`;
}

export function reset() {
  count = 0;
}
