// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import LongdoMap from 'longdo-map-vue'

// ensure Firebase initializes & auth is available
import './firebase'

const app = createApp(App)

app.use(LongdoMap, {
    load: {
        apiKey: '3013d29eca5230ad752a9dc3c9b4bad1',
        language: 'th',
        defer: true,
    },
})

app.mount('#app')