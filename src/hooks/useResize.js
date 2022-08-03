/*
 * @Author: yang: 1327462182@qq.com
 * @Date:
 * @Last Modified by:   yang: 1327462182@qq.com
 * @Last Modified time:
 */
import { useStore } from "vuex";
import { onBeforeMount, onBeforeUnmount } from "vue";
const WIDTH = 992; // refer to Bootstrap's responsive design

export const useResize = () => {
  const store = useStore();
  const resizeHandler = () => {
    let deviceType = "pc";
    const rect = document.body.getBoundingClientRect();
    if (rect.width - 1 < WIDTH) {
      let ua = navigator.userAgent;
      //android终端
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1;
      //ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      deviceType = isAndroid ? "android" : isiOS ? "ios" : "";
    } else {
      // 是pc
      deviceType = "pc";
    }
    store.dispatch("app/getDevice", deviceType);
  };

  onBeforeMount(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });
};
