const namespace = "game-h5-vuex";

export const setItem = (key, value) => {
  const storage = JSON.parse(localStorage.getItem(namespace) || "{}");
  storage[key] = value;
  localStorage.setItem(namespace, JSON.stringify(storage || {}));
};

export const getItem = (key) => {
  const storage = JSON.parse(localStorage.getItem(namespace) || "{}");
  return storage[key] || "";
};

export const removeItem = (key) => {
  const storage = JSON.parse(localStorage.getItem(namespace) || "{}");
  delete storage.key;
  localStorage.setItem(namespace, JSON.stringify(storage || {}));
};

export const clearStorage = (key) => {
  localStorage.removeItem(namespace);
};
