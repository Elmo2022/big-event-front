<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue';
import VMdEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import '@kangc/v-md-editor/lib/theme/style/github.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import katex from 'katex'
import 'katex/dist/katex.min.css'
// VMdEditor.use(githubTheme);
VMdEditor.use(createKatexPlugin());

//文章分类数据模型
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])

//用户搜索时选中的分类id
const categoryId = ref('')

//用户搜索时选中的发布状态
const state = ref('')

//文章列表数据模型
const articles = ref([])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    articleList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    articleList()
}


//回显文章分类
import { articleCategoryListService,articleListService,articleAddService,articleDeleteService,articleUpdateService } from '@/api/article.js'
import {toQQ,toQQzone,toWeibo} from '@/utils/share.js'

const articleCategoryList = async () => {
    let result = await articleCategoryListService();

    categorys.value = result.data;
}

//获取文章列表数据
const articleList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        categoryId: categoryId.value ? categoryId.value : null,
        state: state.value ? state.value : null
    }
    let result = await articleListService(params);

    //渲染视图
    total.value = result.data.total;
    articles.value = result.data.items;

    //处理数据,给数据模型扩展一个属性categoryName,分类名称
    for (let i = 0; i < articles.value.length; i++) {
        let article = articles.value[i];
        for (let j = 0; j < categorys.value.length; j++) {
            if (article.categoryId == categorys.value[j].id) {
                article.categoryName = categorys.value[j].categoryName;
            }
        }
    }
}


articleCategoryList()
articleList();

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
const visibleUpdate = ref(false)
//添加表单数据模型
const articleModel = ref({
    title: '',
    categoryId: '',
    coverImg: '',
    content: '',
    state: ''
})

const updateModel= ref({
    title: '',
    categoryId: '',
    coverImg: '',
    content: '',
    state: ''
})

//导入token
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore();

//上传成功的回调函数
const uploadSuccess = (result)=>{
    articleModel.value.coverImg = result.data;
    console.log(result.data);
}

//添加文章
import {ElMessage,ElMessageBox} from 'element-plus'

    const updateArticle  = async (clickState)=>{
        console.log("打开了吗")
//     //把发布状态赋值给数据模型
      updateModel.value.state = clickState;

//     //调用接口
    let result = await articleUpdateService(updateModel.value);

   ElMessage.success(result.msg? result.msg:'修改成功');

//     //让抽屉消失
      visibleUpdate.value = false;

//     //刷新当前列表
    articleList()
}
const deleteArticle = (row) => {
    //提示用户  确认框
    console.log(11111)
    ElMessageBox.confirm(
        '你确认要删除该文章信息吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let result = await articleDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            //刷新列表
            articleList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '用户取消了删除',
            })
        })
}
const visibleUpdateFunction =  async (row) => {
    console.log(54242)
    visibleUpdate.value = true;
    //把当前行的数据赋值给数据模型
    updateModel.value = row;
}


//文章分类
const addArticle = async (clickState)=>{
    //把发布状态赋值给数据模型
    articleModel.value.state = clickState;
  // console.log(articleModel.value);

    //调用接口
    let result = await articleAddService(articleModel.value);

    ElMessage.success(result.msg? result.msg:'添加成功');

    //让抽屉消失
    visibleDrawer.value = false;

    //刷新当前列表
    articleList()
}
const QQshare = async ()=>{
    let url="http://123.57.188.172:8888/big-event/article/manage"
    let  title="欢迎大家观看我的笔记"
    //把发布状态赋值给数据模型
   toQQ(url,title)
}
const QQzoneshare = async ()=>{
    let url="http://123.57.188.172:8888/big-event/article/manage"
    let  title="欢迎大家观看我的笔记"
    //把发布状态赋值给数据模型
   toQQzone(url,title)
}
const weiboshare = async ()=>{
    let url="http://123.57.188.172:8888/big-event/article/manage"
    let  title="欢迎大家观看我的笔记"
    //把发布状态赋值给数据模型
   toWeibo(url,title)
}
//  const renderMath= ()=>{

//       const element = document.querySelector('.test')
//         console.log(element)
   
//         katex.render("$$a^b$$", element, {
        
//         }
//     );
//     }
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true">添加文章</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="文章分类：">
                <el-select placeholder="请选择" v-model="categoryId">
                    <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="articleList">搜索</el-button>
                <el-button @click="categoryId = ''; state = ''">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
            <el-table-column label="分类" prop="categoryName"></el-table-column>
            <el-table-column label="发表时间" prop="createTime"> </el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="visibleUpdateFunction(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteArticle(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" title="添加文章" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="articleModel" label-width="100px">
                <el-form-item label="文章标题">
                    <el-input v-model="articleModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="articleModel.categoryId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                                 <!-- 
                        auto-upload:设置是否自动上传
                        action:设置服务器接口路径
                        name:设置上传的文件字段名
                        headers:设置上传的请求头
                        on-success:设置上传成功的回调函数
                     -->
                   
                <!-- <el-form-item label="文章封面">

   
                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="文章内容">
                    <div class="editor">
                        <!-- <quill-editor theme="snow" v-model:content="articleModel.content" contentType="html">
                        </quill-editor> -->

                  <v-md-editor v-model="articleModel.content"   />

                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addArticle('已发布')">发布</el-button>
                    <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <el-drawer v-model="visibleUpdate" title="修改文章" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="updateModel" label-width="100px">
                <el-form-item label="文章标题">
                    <el-input v-model="updateModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="updateModel.categoryId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="文章内容">
                    <div class="editor">
                        <!-- <quill-editor theme="snow" v-model:content="articleModel.content" contentType="html">
                        </quill-editor> -->

                  <v-md-editor v-model="updateModel.content"  />

                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateArticle('已发布')">发布</el-button>
                    <el-button type="info" @click="updateArticle('草稿')">草稿</el-button>
                </el-form-item>
                <el-form-item label="分享文章">
                    
                    <el-image @click="QQshare" style="width: 5%;height: 50%;margin-left: 3%;margin-top: 5%" alt="hhh" src="https://zhangtianbo.oss-cn-beijing.aliyuncs.com/4cc0fb12-5bbb-420a-bd9c-21b324ae38ce.png"></el-image>
                    <el-image @click="QQzoneshare" style="width: 5%;height: 50%;margin-left: 3%;margin-top: 5%" alt="hhh" src="https://zhangtianbo.oss-cn-beijing.aliyuncs.com/9cce228e-3aef-421e-a6ea-8202ac3da29b.png"></el-image>
                    <el-image @click="weiboshare" style="width: 5%;height: 50%;margin-left: 3%;margin-top: 5%" alt="hhh" src="https://zhangtianbo.oss-cn-beijing.aliyuncs.com/4d818202-491a-4ece-8d71-660f6f8a4ba5.png"></el-image>
                </el-form-item>
            </el-form>
            
        </el-drawer>
     
        
    </el-card>
  
</template>
<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>