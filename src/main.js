import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import App from './App.vue'
import {createPinia} from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import locale from 'element-plus/dist/locale/zh-cn.js'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
//import mavonEditor from 'mavon-editor'
const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)
app.use(pinia)
app.use(VMdEditor)
// app.use(githubTheme)
app.use(router)
//app.use(mavonEditor);
app.use(ElementPlus,{locale});
app.mount('#app')
