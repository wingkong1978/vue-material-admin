<template>
  <div id="page-timepickers">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6 sm12>
          <v-widget title="Basic Usage">
            <div slot="widget-content">
              <v-time-picker v-model="picker" color="primary lighten-1" />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg6 sm12 class="hidden-sm-and-down">
          <v-widget title="Full Width">
            <div slot="widget-content">
              <v-time-picker v-model="picker" landscape full-width color="green lighten-1" />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg6 sm12>
          <v-widget title="In dialog and menu" class="mt-3">
            <div slot="widget-content">
              <v-container>
                <v-layout row wrap>
                  <v-flex xs11 sm5>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      lazy
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      min-width="290px"
                      :return-value.sync="date"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="event"
                        readonly
                      />
                      <v-time-picker v-model="date" no-title scrollable>
                        <v-spacer />
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-time-picker>
                    </v-menu>
                  </v-flex>
                  <v-spacer />
                  <v-flex xs11 sm5>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      persistent
                      lazy
                      full-width
                      width="290px"
                      :return-value.sync="date"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Picker in dialog"
                        prepend-icon="event"
                        readonly
                      />
                      <v-time-picker v-model="date" scrollable>
                        <v-spacer />
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-container>
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
      picker: null,
      picker2: null,
      //
      arrayEvents: null,
      date1: null,
      date2: null,
      //
      date: null,
      menu: false,
      modal: false
    }
  },

  methods: {

  }
}
</script>
