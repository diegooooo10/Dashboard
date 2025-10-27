export const getDataFromLocalstorage = <T>(key: string): null | T => {
  return JSON.parse(localStorage.getItem(key) ?? "null");
};
