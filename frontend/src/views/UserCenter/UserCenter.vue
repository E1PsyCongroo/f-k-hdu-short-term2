<script setup>
import { useUserStore, useMemberStore, useFamilyStore } from '@/stores';
import { computed, onMounted } from 'vue'

const userStore = useUserStore();
const memberStore = useMemberStore();
const familyStore = useFamilyStore();

const memberName = computed(() => {
  const member = memberStore.members.find(member => member.member_id === userStore.userInfo.member_id);
  return member ? member.name : "unknown";
});

onMounted(async () => {});

</script>

<template>
  <div class="income-container h-full">
    <CardContainer class="h-full">
      <div class="per-content fd-col f-c">
        <div class="per-avatar">
          <img src="@/assets/images/user.png"/>
        </div>
        <div class="per-info m-t-12 fs-20">
          <p>用户名: {{ userStore.userInfo.username }}</p>
          <p>姓名: {{ memberName }}</p>
          <p>家庭名称: {{ familyStore.family.family_name }}</p>
          <p>家庭人数: {{ familyStore.family.num }}</p>
        </div>
      </div>
    </CardContainer>
  </div>
</template>

<style scoped lang="scss">
#per-card {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    box-shadow:
      0 0 10px 0 rgba(39, 186, 155, 0.5),
      0 0 25px 0 rgba(39, 186, 155, 0.5);
  }
  .per-avatar {
    width: 50%; /* 缩小头像区域宽度 */
    margin: 0 auto; /* 水平居中 */
    position: relative; /* 为子元素提供定位上下文 */
    overflow: hidden; /* 隐藏超出区域的部分 */
    border-radius: 50%; /* 如果需要圆形头像 */
    background-color: #f0f0f0; /* 背景颜色 */

    &::before {
      content: '';
      display: block;
      padding-top: 100%; /* 使容器高度与宽度相同，形成正方形 */
    }

    & > img {
      position: absolute; /* 让图片绝对定位以填充父容器 */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover; /* 使图片按照比例填满容器 */
    }
  }
}
</style>
