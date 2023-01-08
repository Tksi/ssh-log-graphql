export const AuthLog = {
  date: (parent) => {
    return new Date(parent.date).toLocaleString();
  },
};
