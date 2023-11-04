export const convertUsername = (name) => {
  return (
    name.split(" ").join("").toLowerCase() +
    Math.random().toString(36).slice(-4)
  );
};
