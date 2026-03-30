import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import vuetify from './plugins/vueitfy'

createApp(App).use(vuetify).mount('#app')
