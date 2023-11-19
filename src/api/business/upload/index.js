import request from '@/utils/hsj/service'

// 是否可以上传
// export function getCheck(data) {
//   return request.post({
//     url: '/file/uploader/check',
//     data,
//   })
// }

// 询问文件是否上传过
export function getCurrentChunk(params) {
  return request.get({
    url: '/uploader/chunk',
    params
  })
}

export function mergeSimpleUpload(data) {
  return request.post({
    url: '/uploader/mergeFile',
    data
  })
}

export function uploadCell(data) {
  request.post({
    url: '/admin/source/uploadCellImg',
    data
  })
}
