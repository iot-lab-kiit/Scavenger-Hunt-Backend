export const createResponse = (status, message) => {
  return { state: status, data: message };
};
