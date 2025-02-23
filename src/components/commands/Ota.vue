<script setup lang="ts">
import { ref } from 'vue';
import type { HomeControlCommandResult } from './common';
import { command } from './helper';

interface OtaCommandResult {
  Ota: Ota
}

interface Ota {
  Version: OtaVersionResult
}

interface OtaVersionResult {
  version: string,
  slot: object,
}

/** generic Ota command */
function command_ota(data: object | string) {
  const ota_command = { Ota: data }
  return command<HomeControlCommandResult<OtaCommandResult>>(ota_command);
}

/** Ota Update command */
function update() {
  const update_command = { Update: { version: null } };
  command_ota(update_command).then((response) => console.log(response));
}

/** Invalidate Ota version */
function invalidate_ota() {
  const invalidate_command = "InvalidateOta";
  command_ota(invalidate_command).then((response) => console.log(response));
}

const version = ref()

/** fetch the current running version */
function get_version() {
  const get_version_command = "GetVersion"
  command_ota(get_version_command).then((response) => version.value = response.data.appliance_message.Command.command_result.Ota.Version.version);
}
</script>

<template>
  <v-btn @click="update()" variant="outlined">Update firmware</v-btn>
  <v-btn @click="invalidate_ota()" variant="outlined">Invalidate firmware</v-btn>
  <v-btn @click="get_version()" variant="outlined">Get firmware version</v-btn>
  <v-text-field label="Version" v-model="version"></v-text-field>
</template>
