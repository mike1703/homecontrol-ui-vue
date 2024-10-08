<script setup lang="ts">
import axios from "axios";
import { inject } from "vue";

const hostname = inject("hostname");

function update() {
  axios
    .post(hostname + "/command", {
      Ota: {
        Update: {
          version: null,
        },
      },
    })
    .then((response) => console.log(response));
}
</script>

<template>
  <button @click="update()">Update Firmware</button>
</template>
