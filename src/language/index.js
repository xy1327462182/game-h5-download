//语言
import { createI18n } from "vue-i18n"; //引入vue-i18n组件
import { getItem } from "@/utils/storage";
import arabic from "./modules/arabic";
import bengali from "./modules/bengali";
import chinese from "./modules/chinese";
import chinese2 from "./modules/chinese2";
import english from "./modules/english";
import french from "./modules/french";
import german from "./modules/german";
import hindi from "./modules/hindi";
import indonesian from "./modules/indonesian";
import italian from "./modules/italian";
import japanese from "./modules/japanese";
import korean from "./modules/korean";
import portuguese from "./modules/portuguese";
import russian from "./modules/russian";
import spanish from "./modules/spanish";
//注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false,
  locale: (getItem("app") && getItem("app").lang) || "chinese2", //默认显示的语言
  messages: {
    chinese,
    chinese2,
    english,
    arabic,
    bengali,
    chinese,
    chinese2,
    english,
    french,
    german,
    hindi,
    indonesian,
    italian,
    japanese,
    korean,
    portuguese,
    russian,
    spanish,
  },
});
export default i18n; //将i18n暴露出去，在main.js中引入挂载
