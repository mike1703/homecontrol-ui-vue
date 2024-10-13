<script setup lang="ts">
import { onMounted } from "vue";
import type { HomeControlCommandResult } from "./common";
import { command } from "./helper";

interface MeterCommandResult {
  Meter: Meter;
}

interface Meter {
  MeterSet: MeterSet;
  MeterGet: MeterGet;
}

interface MeterSet {
  name: string;
  value: number;
  old_value: number;
}

interface MeterGet {
  name: string;
  value: number;
}

const current_value = defineModel<number>();

/** set the gas meter value */
function set_gas_value() {
  if (current_value.value == undefined) {
    return;
  }
  const set_gas_command = { Meter: { Set: { new_counter: current_value.value * 100, } } };
  command(set_gas_command).then((response) => console.log(response));
}

/** get the current gas meter value */
function get_current_value() {
  const get_gas_command = { Meter: "Get" }
  command<HomeControlCommandResult<MeterCommandResult>>(get_gas_command).then((response) => {
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
