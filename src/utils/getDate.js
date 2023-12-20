export const getDate = (date) => {
  const usedDate = new Date(date);
  return (
    usedDate.toLocaleDateString('en-US') +
    ' ' +
    usedDate.getHours() +
    ':' +
    usedDate.getMinutes() +
    ':' +
    usedDate.getSeconds()
  );
};

export const getNoteDate = (date) => {
  const usedDate = new Date(date);
  return usedDate.toLocaleDateString('en-US');
};
