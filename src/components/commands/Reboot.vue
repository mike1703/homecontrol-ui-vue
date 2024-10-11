<script setup lang="ts">
import axios from "axios";
import { inject } from "vue";

const hostname = inject("hostname");

function reboot() {
  axios
    .post(hostname + "/command", {
      Diagnostic: "Restart",
    })
    .then((response) => console.log(response));
}
</script>

<template>
  <v-btn @click="reboot()" variant="outlined">Reboot</v-btn>
</template>
