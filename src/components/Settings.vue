<script setup lang="ts">
import { onMounted, reactive } from "vue";
import SettingInput from "./SettingInput.vue";
import { command } from "./commands/helper";
import type { HomeControlCommandResult } from "./commands/common";

interface SettingsCommandResult {
  Settings: Settings
}

interface Settings {
  Config: settings_dict
}

interface settings_dict {
  settings: [string, any]
}

let data = reactive({ settings: {} });

async function load_data() {
  const load_settings_command = { Settings: "Export" };
  command<HomeControlCommandResult<SettingsCommandResult>>(load_settings_command).then(
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
