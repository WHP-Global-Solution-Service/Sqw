// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import LongdoMap from 'longdo-map-vue'
import './firebase'

const app = createApp(App)

app.component('RouterView', { name: 'RouterViewStub', render() { return null } })

window.__LONGDO_KEY = '3013d29eca5230ad752a9dc3c9b4bad1';

app.use(LongdoMap, {
    load: {
        apiKey: window.__LONGDO_KEY, // ใช้ key เดียวกัน
        language: 'th',
        defer: false,
        services: ['search'],
    },
})

app.mount('#app')