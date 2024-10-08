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
  <div class="settings">
    <li v-for="(value, setting) in data.settings">
      <SettingInput :setting :value />
    </li>
  </div>
</template>
