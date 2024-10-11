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
  <v-btn @click="get_current_value()" variant="outlined">Get current value</v-btn>
  <v-text-field width="400" label="Gas Meter" v-model="current_value" clearable hide-details>
    <template v-slot:append> <v-btn class="mr-0 ml-2 mb-1 p-0" @click="set_gas_value" color="primary">
        Submit
      </v-btn>
    </template>
  </v-text-field>
</template>
