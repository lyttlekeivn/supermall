import {axiosRequest} from "@/network/request";

export function getHomeMultiData(){
  return axiosRequest({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return axiosRequest({
    url: '/home/data',
    params: {
      type,
      page,
    }
  })
}
