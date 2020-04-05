<template>
  <!--  <v-card-->
  <!--          height="400"-->
  <!--          width="256"-->
  <!--          class="mx-auto"-->
  <!--  >-->
  <v-navigation-drawer
    id="appDrawer"
    v-model="drawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    width="260"
  >
    <v-toolbar color="primary darken-1" dark>
      <img :src="computeLogo" height="36" alt="Vue Material Admin Template">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">{{ appTitle }}</span>
      </v-toolbar-title>
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand tile>
        <template v-for="(item, i) in menus">
          <!--group with subitems-->
          <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon" no-action="no-action">

            <template v-slot:activator>
              <!--                  <v-list-item>-->
              <!--              <v-list-item-content>-->
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <!--              </v-list-item-content>-->
              <!--            </v-list-item>-->
            </template>
            <template v-for="(subItem, i) in item.items">
              <!--sub group-->
              <v-list-group v-if="subItem.items" :key="subItem.name" :group="subItem.group" sub-group="sub-group">
                <template v-slot:activator>
                  <v-list-item ripple>
                    <!--                  <v-list-item  slot="activator" ripple="ripple">-->
                    <v-list-item-content>
                      <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-list-item v-for="(grand, i) in subItem.children" :key="i" :to="genChildTarget(item, grand)" :href="grand.href">
                  <v-list-item-content>
                    <v-list-item-title>{{ grand.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <!--child item-->
              <v-list-item v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple="ripple">
                <v-list-item-content>
                  <v-list-item-title><span>{{ subItem.title }}</span></v-list-item-title>
                </v-list-item-content>
                <!-- <v-circle class="white--text pa-0 circle-pill" v-if="subItem.badge" color="red" disabled="disabled">{{ subItem.badge }}</v-circle> -->
                <v-list-item-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="i" />
          <!--top-level link-->
          <v-list-item v-else :key="item.name" :to="!item.href ? { name: item.name } : null" :href="item.href" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener">
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <!-- <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> -->
            <v-list-item-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-item-action>
            <!-- <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> -->
          </v-list-item>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
<!--  </v-card>-->
</template>
<script>
import menu from '@/api/menu'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import imgM from '@/static/m.png'
export default {
  name: 'AppDrawer',
  components: {
    VuePerfectScrollbar
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
    drawer:{
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    mini: false,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    },
    appTitle: 'Vuetify Admin'
  }),
  computed: {
    computeGroupActive() {
      return true
    },
    computeLogo() {
      return imgM
    },

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav
    }
  },
  mounted() {
    console.log('menu....--->', menu)
  },
  created() {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer)
    })
  },

  methods: {
    genChildTarget(item, subItem) {
      if (subItem.href) return
      if (subItem.component) {
        return {
          name: subItem.component
        }
      }
      return { name: `${item.group}/${(subItem.name)}` }
    }
  }
}
</script>

<style lang="scss">
 /*@import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';*/

 /*@import "~vuetify/src/styles/s";*/

#appDrawer{

  overflow: hidden;
  .drawer-menu--scroll{

    height: calc(100vh - 80px);
    overflow: auto;
  }
}

</style>
