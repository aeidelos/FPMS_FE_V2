import { request } from '@/utils/request'

export function saveAnnouncement (announcement) {
  return request('put', '/announcement', announcement)
}

export function getAnnouncement (context) {
  return request('post', '/announcement', context)
}
