<script setup lang="ts">
import { command } from './helper';

function reboot() {
  const reboot_command = { Diagnostic: "Restart" };
  command(reboot_command).then((response) => console.log(response));
}
</script>

<template>
  <v-btn @click="reboot()" variant="outlined">Reboot</v-btn>
</template>
