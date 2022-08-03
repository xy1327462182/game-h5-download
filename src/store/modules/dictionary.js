const state = () => ({
  // 语言
  langList: [
    // { label: "简体中文", value: "chinese" },
    { label: "繁体中文", value: "chinese2" },
    { label: "English", value: "english" },
    { label: "日本語", value: "japanese" },
    { label: "한국어", value: "korean" },
    { label: "हिन्दी", value: "hindi" },
    { label: "Indonesia", value: "indonesian" },
    { label: "Deutsch", value: "german" },
    { label: "Français", value: "french" },
    { label: "Español", value: "spanish" },
    { label: "Português", value: "portuguese" },
    { label: "Italian", value: "italian" },
    { label: "русский", value: "russian" },
    { label: "بالعربية", value: "arabic" },
    { label: "বাংলা", value: "bengali" },
  ],
  langMap: {
    1: "chinese2",
    2: "english",
    3: "japanese",
    4: "korean",
    5: "hindi",
    6: "indonesian",
    7: "german",
    8: "french",
    9: "spanish",
    10: "portuguese",
    11: "italian",
    12: "russian",
    13: "arabic",
    14: "bengali",
  },
});
const getters = {
  langList: (state) => state.langList,
  langMap: (state) => state.langMap,
};
const mutations = {};
const actions = {};
export default { state, getters, mutations, actions };
