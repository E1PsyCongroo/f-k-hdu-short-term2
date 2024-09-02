<script setup>
import PersonInfo from './components/PersonInfo.vue'
import { useMemberStore, useFamilyStore } from '@/stores'
import { onMounted } from 'vue'

const memberStore = useMemberStore()
const familyStore = useFamilyStore()
onMounted(() => {})
</script>

<template>
  <div class="member-container h-full">
    <div class="family-info mb-4">
      <h2>
        {{ familyStore.family.family_name }} - 家庭人数:
        {{ familyStore.family.num }}
      </h2>
    </div>
    <CardContainer class="h-full">
      <div class="member-content f-s flex-wrap">
        <div
          class="per-box w-22% m-r-3% m-b-1.5% relative"
          v-for="person in memberStore.members"
          :key="person.member_id"
        >
          <PersonInfo :person-info="person" />
        </div>
        <div class="per-box w-22% m-r-3% m-b-1.5% relative">
          <PersonInfo />
        </div>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped>
.per-box {
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
:deep(.el-card__body) {
  .content {
    overflow-y: visible !important;
  }
}
</style>
