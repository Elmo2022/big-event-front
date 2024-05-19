<script setup>
import { ref } from 'vue'
//import useUserInfoStore from '@/stores/userInfo.js'
//const userInfoStore = useUserInfoStore();

//const userInfo = ref({...userInfoStore.info})
const password =ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd:''})


//修改密码
import {changePasswordService} from '@/api/user.js'
import {ElMessage} from 'element-plus'
const updateUserInfo = async ()=>{
    //调用接口
    if(password.new_pwd==password.re_pwd){
        let result = await changePasswordService(password.value);
    ElMessage.success(result.msg? result.msg : '修改成功');
    }

    
    //修改pinia中的个人信息
  //  userInfoStore.setInfo(userInfo.value)
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="password"  label-width="100px" size="large">
                    <el-form-item label="原密码">
                        <el-input v-model="password.old_pwd" ></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" >
                        <el-input v-model="password.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" >
                        <el-input v-model="password.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">点击重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>