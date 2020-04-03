<template>
  <div id="page-pagination">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <v-widget title="Default">
            <div slot="widget-content" class="text-xs-center">
              <v-pagination v-model="page" />
            </div>
          </v-widget>
          <v-widget title="Visiable Limit" class="mt-3">
            <div slot="widget-content" class="text-xs-center">
              <v-pagination v-model="page" :length="15" :total-visible="7" />
            </div>
          </v-widget>
          <v-widget title="Short" class="mt-3">
            <div slot="widget-content" class="text-xs-center">
              <v-pagination v-model="page" :length="5" />
            </div>
          </v-widget>
          <v-widget title="Round" class="mt-3">
            <div slot="widget-content" class="text-xs-center">
              <v-pagination v-model="page" :length="5" circle />
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget'
export default {
  components: {
    VWidget
  },
  data() {
    return {
      page: 1
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
