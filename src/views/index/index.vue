<template>
  <div
    class="page"
    :style="{ backgroundImage: `url(${fatchData.backgroudimage})` }"
  >
    <!-- 顶部 -->
    <div class="head between">
      <div class="logo_wrap"></div>
      <div class="lang_wrap" @click="langClick">
        <img src="@/assets/common/language_icon.png" class="lang_icon" alt="" />
        <span class="lang_name">{{ $t("lang") }}</span>
        <img src="@/assets/common/arrow_down.png" class="arrow_icon" alt="" />
      </div>
    </div>

    <!-- 中间 -->
    <div class="main center">
      <img src="@/assets/common/main_logo.png" class="main_img" alt="" />
      <span class="main_title">{{ fatchData.officialcontent }}</span>
    </div>

    <!-- 底部 -->
    <div class="foo" v-if="device !== 'pc'">
      <div class="foo_line">本應用暫未上架應用商店</div>
      <div class="foo_line">下載時如提示异常為誤報請放心下載</div>
      <div class="down_btn center" v-if="device === 'ios'">
        <img src="@/assets/common/icon_ios.png" class="model_icon" alt="" />
        <span class="btn_name">應用下載</span>
      </div>
      <div class="down_btn center" v-if="device === 'android'">
        <img src="@/assets/common/icon_android.png" class="model_icon" alt="" />
        <span class="btn_name">應用下載</span>
      </div>
    </div>
    <div class="foo" v-if="device === 'pc'">
      <img src="@/assets/common/pc_qrcode.png" class="qrcode" alt="" />
      <div class="device_line">
        <img
          src="@/assets/common/icon_android.png"
          class="device_type_icon"
          alt=""
        />
        <img
          src="@/assets/common/icon_ios.png"
          class="device_type_icon"
          alt=""
        />
      </div>
      <div class="foo_line">{{ $t("scanToDownloadApp") }}</div>
    </div>

    <van-popup
      v-model:show="langPopShow"
      position="bottom"
      :style="{ height: '80%' }"
      round
    >
      <div class="pop">
        <div class="head">{{ $t("langChange") }}</div>
        <div class="list">
          <div
            class="item between"
            v-for="(item, index) in langList"
            :key="index"
            @click="selectLangClick(item)"
          >
            <span class="label">{{ item.label }}</span>
            <img
              src="@/assets/common/lang_check_icon.png"
              class="check_icon"
              alt=""
              v-if="lang === item.value"
            />
          </div>
        </div>
      </div>
    </van-popup>

    <loading :show="pageLoading" :maskColor="maskColor" :bgColor="bgColor" />
    <loading
      v-if="notAllowShow"
      :show="true"
      maskColor="#002948"
      bgColor="#002948"
    >
      <div class="not_allow_block center">
        <img
          src="@/assets/common/not_allow_icon.png"
          class="not_allow_icon"
          alt=""
        />
        <span class="not_allow_line">根據相關法律法規</span>
        <span class="not_allow_line">暫不支持你所在的國家/地區訪問</span>
      </div>
    </loading>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Toast } from "vant";
import { useMapGetters } from "@/hooks/useMapGetters";
import Loading from "@/components/Loading/Loading.vue";
import { fatchGallery } from "@/api/index";
const { field: device } = useMapGetters("app/device");
const { field: lang } = useMapGetters("app/lang");
const { field: langList } = useMapGetters("dictionary/langList");
const { field: langMap } = useMapGetters("dictionary/langMap");
const store = useStore();
const { locale, t } = useI18n();
const notAllowShow = ref(false);
const langPopShow = ref(false);
const pageLoading = ref(false);
const maskColor = ref("#002948");
const bgColor = ref("#002948");

const fatchData = ref({
  minlogoimagewp: "",
  minlogoimage: "",
  maxlogoimagewp: "",
  maxlogoimage: "",
  backgroudimagewp: "",
  backgroudimage: require("@/assets/index/index_bg.png"),
  dowcontent: "", // 下载提示
  officialcontent: "", // 海报文案
  iosfile: "",
  andfile: "",
});

const langClick = () => {
  langPopShow.value = true;
};

// 语言选择点击
const selectLangClick = (item) => {
  maskColor.value = "rgba(0,0,0,0.6)";
  bgColor.value = "rgba(0,0,0,0.9)";
  pageLoading.value = true;

  setTimeout(() => {
    store.dispatch("app/getLang", item.value);
    locale.value = item.value;
    pageLoading.value = false;
    Toast(t("languageChangeSucceeded"));
    langPopShow.value = false;
  }, 1000);
};

onMounted(() => {
  pageLoading.value = true;
  fatchGallery()
    .then((res) => {
      if (res.code === 1) {
        console.log(res.data);
        // fatchData.value = res.data;
        // 切换语言
        store.dispatch("app/getLang", langMap.value[res.data.lang]);
        locale.value = langMap.value[res.data.lang];
        pageLoading.value = false;
      } else {
        pageLoading.value = false;
      }
    })
    .catch((err) => {
      pageLoading.value = false;
      console.log("err:", err);
    });
  setTimeout(() => {
    // const rendomNum = Math.random();
    // console.log("rendomNum:", rendomNum);
    // if (rendomNum < 0.1) {
    //   pageLoading.value = false;
    //   // 不允许访问
    //   notAllowShow.value = true;
    // } else {
    //   pageLoading.value = false;
    // }
  }, 700);
});
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  // background: url("@/assets/index/index_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 2.67vw;
  box-sizing: border-box;
  position: relative;
  .head {
    height: 14.13vw;
    padding: 0 4.27vw;
    box-sizing: border-box;
    .logo_wrap {
      width: 22.93vw;
      height: 5.87vw;
      background: url("@/assets/common/nav_icon_logo.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .lang_wrap {
      display: flex;
      align-items: center;
      padding: 0 3.2vw;
      height: 7.2vw;
      border-radius: 3.6vw;
      border: 0.27vw solid rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      .lang_icon {
        width: 2.93vw;
        height: 2.93vw;
      }
      .lang_name {
        font-size: 3.2vw;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        color: #ffffff;
        margin: 0 1.13vw;
      }
      .arrow_icon {
        width: 2.13vw;
        height: 2.13vw;
      }
    }
  }

  .main {
    position: absolute;
    top: 65.33vw;
    left: 50%;
    transform: translate(-50%, 0);
    flex-direction: column;
    .main_img {
      width: 21.33vw;
      height: 21.33vw;
    }
    .main_title {
      font-size: 5.33vw;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      color: #ffffff;
      margin-top: 5.34vw;
    }
  }

  .foo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 14.67vw;
    padding-left: 5.33vw;
    padding-right: 5.33vw;
    box-sizing: border-box;
    .foo_line {
      font-size: 3.2vw;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;
      line-height: 6.67vw;
    }
    .down_btn {
      width: 100%;
      height: 13.07vw;
      background: #0084ff;
      border-radius: 2.67vw;
      margin-top: 4vw;
      .model_icon {
        width: 4.53vw;
        height: 4.53vw;
      }
      .btn_name {
        font-size: 4vw;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        margin-left: 2.4vw;
      }
    }
  }

  .pop {
    width: 100%;
    height: 100%;
    background: #2b3e5d;
    padding-top: 3.2vw;
    box-sizing: border-box;
    .head {
      width: 100%;
      height: 14.67vw;
      line-height: 14.67vw;
      font-size: 4.8vw;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .list {
      width: 100%;
      height: calc(100% - 14.67vw);
      overflow-y: auto;
      padding-left: 5.53vw;
      padding-right: 5.53vw;
      box-sizing: border-box;
      .item {
        width: 100%;
        height: 13.2vw;
        border-bottom: 0.13vw solid rgba(255, 255, 255, 0.1);
        .label {
          font-size: 4vw;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #ffffff;
        }
        .check_icon {
          width: 4.8vw;
          height: 4.8vw;
        }
      }
    }
  }

  .not_allow_block {
    flex-direction: column;
    .not_allow_icon {
      width: 20vw;
      height: 20vw;
      margin-bottom: 9.33vw;
    }
    .not_allow_line {
      font-size: 4.27vw;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;
      margin-bottom: 2.67vw;
    }
  }
}
@media screen and (min-width: 992px) {
  .page {
    width: 500px;
    margin: 0 auto;
    padding-top: 32px;
    .head {
      height: 38px;
      padding: 0 22px;
      .logo_wrap {
        width: 114px;
        height: 32px;
      }
      .lang_wrap {
        padding: 0 16px;
        height: 36px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        .lang_icon {
          width: 16px;
          height: 16px;
        }
        .lang_name {
          font-size: 16px;
          font-family: SourceHanSansSC-Regular, SourceHanSansSC;
          color: #ffffff;
          margin: 0 1.13vw;
        }
        .arrow_icon {
          width: 12px;
          height: 12px;
        }
      }
    }
    .main {
      top: 327px;
      .main_img {
        width: 106px;
        height: 106px;
      }
      .main_title {
        font-size: 27px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        margin-top: 26px;
      }
    }
    .foo {
      bottom: 73px;
      padding-left: 0;
      padding-right: 0;
      .qrcode {
        width: 132px;
        height: 132px;
      }
      .device_line {
        width: 86px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 23px;
        margin-bottom: 20px;
        .device_type_icon {
          width: 22px;
          height: 22px;
        }
      }
      .foo_line {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #ffffff;
        line-height: 24px;
        max-width: 380px;
        text-align: center;
      }
    }
  }
}
</style>
