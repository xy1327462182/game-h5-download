import request from "@/utils/request";

// 查询海报基础信息
export function fatchGallery(data) {
  return request({
    url: "/api/hb/getbaceconf",
    method: "get",
    data,
  });
}
