import { getItem, setItem } from "@/utils/storage";

const state = () => ({
  // 当前设备类型
  device: "pc", // pc  ios  android
  lang: (getItem("app") && getItem("app").lang) || "chinese2",
});
const getters = {
  device: (state) => state.device,
  lang: (state) => state.lang,
};
const mutations = {
  // 设置设备类型
  setDevice(state, payload) {
    state.device = payload;
  },
  // 设置语言
  setLang(state, payload) {
    setItem("lang", payload);
    state.lang = payload;
  },
};
const actions = {
  // 设置设备类型
  getDevice({ commit }, payload) {
    commit("setDevice", payload);
  },
  // 设置语言
  getLang({ commit }, payload) {
    commit("setLang", payload);
  },
};
export default { state, getters, mutations, actions };
