<script setup lang="ts">
import axios from "axios";
import { inject, onMounted, reactive } from "vue";
import SettingInput from "./SettingInput.vue";

const hostname = inject("hostname");

let data = reactive({ settings: {} });

async function load_data() {
  axios
    .post(hostname + "/command", { Settings: "Export" })
    .then(
      (homecontrol_response) =>
      (data.settings =
        homecontrol_response.data.Result.appliance_message.Command.command_result.Settings.Config.settings)
    );
}
onMounted(async () => {
  await load_data();
});
</script>

<template>
  <v-container>
    <v-row v-for="(value, setting) in data.settings">
      <v-col md="3">
        <SettingInput :setting :value />
      </v-col>
    </v-row>
  </v-container>
</template>
