import instance from '@/utils/instance'

/**
 * @description 获取家庭接口
 */
export const getFamilyAPI = ({ member_id }) => {
  return instance({
    url: '/family',
    method: 'get',
    params: { member_id: member_id }
  })
}

/**
 * @description 获取成员信息接口
 */
export const getMemberAPI = ({ member_id }) => {
  return instance({
    url: '/members',
    method: 'get',
    params: { member_id: member_id }
  })
}

/**
 * @description 添加成员接口
 */
export const addMemberAPI = (info) => {
  return instance({
    url: '/members',
    method: 'post',
    data: info
  })
}


/**
 * @description 修改成员接口
 */
export const updateMemberAPI = (info, member_id) => {
  return instance({
    url: `/members/${member_id}`,
    method: 'put',
    data: info
  })
}

/**
 * @description 删除成员接口
 */
export const deleteMemberAPI = (member_id) => {
  return instance({
    url: `/members/${member_id}`,
    method: 'delete',
  })
}
