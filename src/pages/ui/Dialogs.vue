<template>
  <div id="page-dialogs">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg4>
          <v-widget title="Basic Usage">
            <div slot="widget-content">
              <v-dialog v-model="basic.dialog" persistent max-width="500px">
                <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">User Profile</span>
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Legal first name" required />
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Legal middle name" hint="example of helper text only on focus" />
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field
                            label="Legal last name"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                          />
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Email" required />
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Password" type="password" required />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-select
                            label="Age"
                            required
                            :items="['0-17', '18-29', '30-54', '54+']"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-select
                            label="Interests"
                            multiple
                            autocomplete
                            chips
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-widget>
        </v-flex>
        <v-flex xl4>
          <v-widget title="Fullscreen Dialog">
            <div slot="widget-content">
              <v-dialog v-model="fullscreen.dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="fullscreen.dialog = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-items>
                      <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-list three-line subheader>
                    <v-subheader>User Controls</v-subheader>
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Content filtering</v-list-tile-title>
                        <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Password</v-list-tile-title>
                        <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                  <v-divider />
                  <v-list three-line subheader>
                    <v-subheader>General</v-subheader>
                    <v-list-tile avatar>
                      <v-list-tile-action>
                        <v-checkbox v-model="fullscreen.notifications" />
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>Notifications</v-list-tile-title>
                        <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                      <v-list-tile-action>
                        <v-checkbox v-model="fullscreen.sound" />
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>Sound</v-list-tile-title>
                        <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                      <v-list-tile-action>
                        <v-checkbox v-model="fullscreen.widgets" />
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                        <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-dialog>
            </div>
          </v-widget>
        </v-flex>
        <v-flex xl4>
          <v-widget title="Scrollable Dialog">
            <div slot="widget-content">
              <v-dialog v-model="scrollable.dialog" scrollable max-width="300px">
                <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
                <v-card>
                  <v-card-title>Select Country</v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-radio-group v-model="scrollable.name" column>
                      <v-radio label="Bahamas, The" value="bahamas" />
                      <v-radio label="Bahrain" value="bahrain" />
                      <v-radio label="Bangladesh" value="bangladesh" />
                      <v-radio label="Barbados" value="barbados" />
                      <v-radio label="Belarus" value="belarus" />
                      <v-radio label="Belgium" value="belgium" />
                      <v-radio label="Belize" value="belize" />
                      <v-radio label="Benin" value="benin" />
                      <v-radio label="Bhutan" value="bhutan" />
                      <v-radio label="Bolivia" value="bolivia" />
                      <v-radio label="Bosnia and Herzegovina" value="bosnia" />
                      <v-radio label="Botswana" value="botswana" />
                      <v-radio label="Brazil" value="brazil" />
                      <v-radio label="Brunei" value="brunei" />
                      <v-radio label="Bulgaria" value="bulgaria" />
                      <v-radio label="Burkina Faso" value="burkina" />
                      <v-radio label="Burma" value="burma" />
                      <v-radio label="Burundi" value="burundi" />
                    </v-radio-group>
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-btn color="blue darken-1" flat @click.native="scrollable.dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="scrollable.dialog = false">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
      basic: {
        dialog: false
      },
      fullscreen: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      },
      scrollable: {
        name: '',
        dialog: false
      }
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
