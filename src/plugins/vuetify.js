// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
        options: {
            themeVariations: ['primary', 'secondary', 'accent'],
            extra: {
                mainToolbar: {
                    color: 'primary'
                },
                sideToolbar: {
                },
                sideNav: 'primary',
                mainNav: 'primary lighten-1',
                bodyBg: ''
            }
        }
    }
    )

const opts = {
    icons: {
        iconfont: 'mdiSvg' || 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    }
}

export default new Vuetify(opts)
