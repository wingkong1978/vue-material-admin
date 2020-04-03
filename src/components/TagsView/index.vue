<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        <!--        {{ generateTitle(tag.title) }}-->
        {{ tag.title }}
        <!--        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />-->
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <!--            <v-btn color="primary" dark v-on="on">Left</v-btn>-->
            <v-icon v-if="!tag.meta.affix" color="indigo darken-4" small @click.prevent.stop="closeSelectedTag(tag)" v-on="on">cancel</v-icon>
          </template>
          <span>关闭</span>
        </v-tooltip>
      </router-link>
    </scroll-pane>
    <v-card
      v-show="visible"
      max-width="100px"
      :style="{left:left+'px',top:top+'px', 'z-index':999}"
    >
      <v-list
        dense
        elevation="2"
      >
        <v-list-item-group>
          <v-list-item @click="refreshSelectedTag(selectedTag)">
            <span>刷新</span>
          </v-list-item>
          <v-list-item v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">
            关闭
          </v-list-item>
          <!--          <v-list-item @click="closeOthersTags">-->
          <!--            <span>关闭其他</span>-->
          <!--          </v-list-item>-->
          <!--          <v-list-item @click="closeAllTags(selectedTag)">-->
          <!--            <span>关闭全部</span>-->
          <!--          </v-list-item>-->
        </v-list-item-group>
      </v-list>
    </v-card>
    <!--    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">-->
    <!--      <li @click="refreshSelectedTag(selectedTag)">refresh</li>-->
    <!--      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">-->
    <!--        close-->
    <!--      </li>-->
    <!--      <li >closeOthers</li>-->
    <!--      <li @click="closeAllTags(selectedTag)">closeAll</li>-->
    <!--    </ul>-->
    <v-alert :type="alertType" :value="alertValue" transition="slide-x-transition" style="position: absolute; right: 0">{{ alertMessage }}</v-alert>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
// import { generateTitle } from '@/utils/i18n'
// import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      tagsCount: 0,
        alertType: 'success',
        alertMessage: '',
        alertValue: false
    }
  },
  computed: {
    visitedViews() {
        console.log('this.$store.state.tagesView---->', this.$store.state.tagsView.visitedViews)
      return this.$store.state.tagsView.visitedViews
    }//,
    // routes() {
    //   return this.$store.state.permission.routes
    // }
  },
  watch: {
    $route() {
      this.addTags()
      // this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    // this.initTags()
    this.addTags()
  },
  methods: {
    // generateTitle, // generateTitle by vue-i18n
    isActive(route) {
      return route.path === this.$route.path
    },
    // filterAffixTags(routes, basePath = '/') {
    //   let tags = []
    //   routes.forEach(route => {
    //     if (route.meta && route.meta.affix) {
    //       const tagPath = path.resolve(basePath, route.path)
    //       tags.push({
    //         fullPath: tagPath,
    //         path: tagPath,
    //         name: route.name,
    //         meta: { ...route.meta }
    //       })
    //     }
    //     if (route.children) {
    //       const tempTags = this.filterAffixTags(route.children, route.path)
    //       if (tempTags.length >= 1) {
    //         tags = [...tags, ...tempTags]
    //       }
    //     }
    //   })
    //   return tags
    // },
    // initTags() {
    //     console.log('this.routes---->', this.routes)
    //   const affixTags = this.affixTags = this.filterAffixTags(this.routes)
    //   for (const tag of affixTags) {
    //     // Must have tag name
    //     if (tag.name) {
    //       this.$store.dispatch('tagsView/addVisitedView', tag)
    //     }
    //   }
    // },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        console.log('view---->', view)
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      console.log('cached view count--->', this.$store.getters.cachedViews.length)
      if (this.$store.getters.cachedViews.length <= 1) {
        console.log('can\'t close')
        this.alertMsg('error', '最后一页不能关闭')
        return
      }
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews)
      })
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // You can set another route
        this.$router.push('/')
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      // this.top = e.clientY / 2

      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    alertMsg(type, msg) {
      const that = this
      this.alertValue = true
      this.alertType = type
      this.alertMessage = msg
      setTimeout(() => {
        that.alertValue = false
      }, 2000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 44px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 16px;
      margin-left: 5px;
      margin-top: 4px;
      border-radius: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #536DFE;
        color: #fff;
        border-color: #8C9EFF;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
