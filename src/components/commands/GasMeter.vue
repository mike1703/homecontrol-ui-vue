<script setup lang="ts">
import axios from "axios";
import { inject, onMounted } from "vue";
import type { HomeControlCommandResult } from "./common";

const hostname = inject("hostname");

const current_value = defineModel<number>();

function set_gas_value() {
  if (current_value.value == undefined) {
    return;
  }
  axios
    .post(hostname + "/command", {
      Meter: {
        Set: {
          new_counter: current_value.value * 100,
        },
      },
    })
    .then((response) => console.log(response));
}

function get_current_value() {
  axios
    .post<HomeControlCommandResult>(hostname + "/command", {
      Meter: "Get",
    })
    .then((response) => {
      console.log(
        response.data.Result.appliance_message.Command.command_result.Meter
          .MeterGet.value
      );
      current_value.value =
        response.data.Result.appliance_message.Command.command_result.Meter
          .MeterGet.value / 100;
    });
}

onMounted(async () => {
  get_current_value();
});
</script>

<template>
  <div>
    <button @click="get_current_value()">Get current value</button>
    <label for="current_value">Gas Meter</label>
    <input id="current_value" v-model.number="current_value" />
    <button @click="set_gas_value">Update</button>
  </div>
</template>
