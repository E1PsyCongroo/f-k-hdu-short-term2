<script setup>
import { Plus } from '@element-plus/icons-vue'
import { useMemberStore, useFamilyStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  personInfo: {
    type: Object,
    default: () => {}
  }
})

const memberStore = useMemberStore()
const familyStore = useFamilyStore()
const dialogVisible = ref(false)
const form = ref({
  name: '',
  relation: '',
  sex: '男',
})
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
  ],
  relation: [
    { required: true, message: '请输入与户主的关系', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value === '户主') {
        callback(new Error('关系不能为“户主”'))
      } else {
        callback()
      }
    }, trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' },
    { validator: (rule, value, callback) => {
      if (value !== '男' && value !== '女') {
        callback(new Error('性别只能为“男”或“女”'));
      } else {
        callback();
      }
    }, trigger: 'change' }
  ]
}
const formRef = ref(null)
const dialogConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(form.value)
      form.value.family_id = familyStore.family.family_id
      memberStore.addMember(form.value)
      dialogVisible.value = false
    }
  })
}
const router = useRouter()
const navigateToDataV = () => {
  router.push(`/data-view?id=${props.personInfo.member_id}`)
}
</script>

<template>
  <CardContainer
    class="wh-full overflow-hidden cursor-pointer"
    id="per-card"
    @click="navigateToDataV"
  >
    <div class="per-content fd-col f-c" v-if="personInfo">
      <div class="per-avatar bg-red w-90% relative overflow-hidden">
        <UglyAvatar></UglyAvatar>
      </div>
      <div class="per-info m-t-12 fs-20">
        {{ personInfo.name }}
      </div>
    </div>
    <div class="per-content f-c h-full" v-else @click="dialogVisible = true">
      <el-icon class="fs-28 color-#8c939d text-center wh-100%">
        <Plus></Plus>
      </el-icon>
    </div>
  </CardContainer>
  <el-dialog v-model="dialogVisible" title="添加成员" width="30%">
    <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关系" prop="relation">
        <el-input v-model="form.relation" placeholder="请输入和户主的关系"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogConfirm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
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
}
</style>
