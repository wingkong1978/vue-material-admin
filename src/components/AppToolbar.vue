<template>
  <v-app-bar
    color="primary"
    fixed
    dark
    app
  >
    <!--    <v-toolbar-title class="ml-0 pl-3">-->
    <v-app-bar-nav-icon @click.stop="handleDrawerToggle" />
    <!--    </v-toolbar-title>-->
    <v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        hide-details
      />
    </v-toolbar-title>
    <v-spacer />
    <v-btn href="mailto:wingkong1978@gmail.com">
      Hire Me
    </v-btn>
    <v-btn icon href="https://github.com/tookit/vue-material-admin">
      <v-icon>fa fa-github</v-icon>
    </v-btn>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon text v-on="on">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <notification-list />
    </v-menu>
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <!--      <v-btn slot="activator" icon large text>-->
        <v-btn icon large text v-on="on">
          <v-avatar size="30px">
            <img :src="headImg" alt="Michael Wang">
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="pa-0">
        <v-list-item v-for="(item,index) in items" :key="index" :to="!item.href ? { name: item.name } : null" :href="item.href" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" @click="item.click">
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList'
import Util from '@/util'
import headImg from '@/static/avatar/man_4.jpg'
export default {
  name: 'AppToolbar',
  components: {
    NotificationList
  },
  data: () => ({
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e)
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e)
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT')
        }
      }
    ],
    headImg
  }),
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    }
  },
  methods: {
    handleDrawerToggle() {
      window.getApp.$emit('APP_DRAWER_TOGGLED')
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    }
  }
}
</script>
