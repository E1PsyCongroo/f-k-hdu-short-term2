<script setup>
import { Plus } from '@element-plus/icons-vue'
import { useMemberStore, useFamilyStore } from '@/stores'
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

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
  sex: '男'
})

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
  ],
  relation: [
    { required: true, message: '请输入与户主的关系', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === '户主') {
          callback(new Error('关系不能为“户主”'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== '男' && value !== '女') {
          callback(new Error('性别只能为“男”或“女”'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

const formRef = ref(null)

const handleEditClick = () => {
  dialogVisible.value = true
  if (props.personInfo) {
    if (props.personInfo.relation === '户主') {
      ElMessage.warning('户主信息不可更改')
      dialogVisible.value = false
    }
    else {
      form.value = {
        name: props.personInfo.name,
        relation: props.personInfo.relation,
        sex: props.personInfo.sex
      }
    }
  } else {
    form.value = { name: '', relation: '', sex: '男' }
  }
}

const dialogConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (props.personInfo) {
        await memberStore.updateMember(form.value, props.personInfo.member_id)
        ElMessage.success('成员信息更新成功')
      } else {
        form.value.family_id = familyStore.family.family_id
        await memberStore.addMember(form.value)
        ElMessage.success('新成员添加成功')
      }
      dialogVisible.value = false
    }
  })
}

const confirmDelete = () => {
  ElMessageBox.confirm(
    '此操作将永久删除该成员, 是否继续?',
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    await memberStore.deleteMember(props.personInfo.member_id)
    ElMessage.success('删除成功')
    dialogVisible.value = false
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<template>
  <CardContainer
    class="wh-full overflow-hidden cursor-pointer"
    id="per-card"
    @click="handleEditClick"
  >
    <div class="per-content fd-col f-c" v-if="personInfo">
      <div class="per-avatar">
        <img src="@/assets/images/user.png"/>
      </div>
      <div class="per-info m-t-12 fs-20">
        <div>{{ personInfo.name }}</div>
        <div>性别: {{ personInfo.sex }}</div>
        <div>关系: {{ personInfo.relation }}</div>
      </div>
    </div>
    <div class="per-content f-c h-full" v-else @click="dialogVisible = true">
      <el-icon class="fs-28 color-#8c939d text-center wh-100%">
        <Plus></Plus>
      </el-icon>
    </div>
  </CardContainer>

  <el-dialog v-model="dialogVisible" title="编辑成员信息" width="30%">
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
        <el-input
          v-model="form.relation"
          placeholder="请输入和户主的关系"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogConfirm">提交</el-button>
        <el-button v-if="personInfo" type="danger" @click="confirmDelete">删除</el-button>
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
    width: 70%; /* 缩小头像区域宽度 */
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

.per-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%; /* 确保内容占据整个容器高度 */
  padding: 10px;
}

.per-info {
  text-align: center;
  font-size: 14px; /* 调整字体大小以适应内容 */
  line-height: 1.5; /* 增加行高以改善可读性 */
  color: #333;
}

.m-t-12 {
  margin-top: 12px;
}

.fs-20 {
  font-size: 20px;
}

:deep(.el-card__body) {
  .content {
    overflow-y: auto !important; /* 允许垂直滚动 */
  }
}
</style>
