<script setup>
import { ref } from 'vue';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 注册主题
VMdEditor.use(githubTheme);
//import useUserInfoStore from '@/stores/userInfo.js'
//const userInfoStore = useUserInfoStore();

//const userInfo = ref({...userInfoStore.info})
const password =ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd:''})

    const value = ref('# test markdown ![Description](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)');
//  const value = ref("# test markdown");

// const prop = computed(() => ({
//   subfield: false, // 单双栏模式
//   defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
//   editable: false,
//   toolbarsFlag: false,
//   scrollStyle: false,
//   boxShadow: false // 边框
// }));
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


    <!-- <mavon-editor 
    :toolbars="toolbars" 
    v-model="value" 
    :subfield="prop.subfield" 
    :defaultOpen="prop.defaultOpen" 
    :toolbarsFlag="prop.toolbarsFlag" 
    :editable="prop.editable" 
    :scrollStyle="prop.scrollStyle" 
    :boxShadow="prop.boxShadow" 
    ref="md" 
  />
 -->
 <!-- <div>
    <v-md-editor v-model="value" />
    <v-md-preview :text="value" />
  </div> -->




</template>