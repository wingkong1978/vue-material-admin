<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer" />
        <app-toolbar class="app--toolbar" />
        <v-content>
          <tags-view />
          <!-- Page Header -->
          <page-header v-if="$route.meta.breadcrumb" />
          <div class="page-wrapper">
            <router-view />
          </div>
          <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">Design &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer />
            <span class="caption mr-1"> Make With Love </span> <v-icon color="pink" small>favorite</v-icon>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab />
        <!-- theme setting -->
        <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          v-model="rightDrawer"
          class="setting-drawer"
          temporary
          right
          hide-overlay
          fixed
        >
          <theme-settings />
        </v-navigation-drawer>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <v-btn dark icon @click.native="snackbar.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import AppDrawer from '@/components/AppDrawer'
import AppToolbar from '@/components/AppToolbar'
import AppFab from '@/components/AppFab'
import PageHeader from '@/components/PageHeader'
import TagsView from '@/components/TagsView'
// import menu from '@/api/menu'
import ThemeSettings from '@/components/ThemeSettings'
import AppEvents from './event'
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    TagsView
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  }),

  computed: {

  },

  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback)
    })
    window.getApp = this
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0)
      this.rightDrawer = (!this.rightDrawer)
    }
  }

}
</script>

<style lang="scss" scoped>
  .setting-fab{
    top:50%!important;
    right:0;
    border-radius:0
  }
  .page-wrapper{
    min-height:calc(100vh - 64px - 50px - 81px - 30px );
  }
</style>
