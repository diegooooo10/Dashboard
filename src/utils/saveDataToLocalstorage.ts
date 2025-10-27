export const saveDataToLocalstorage = <T>(key: string, data: T) => {
  if (typeof data === "string") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
