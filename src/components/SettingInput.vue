<script setup lang="ts">
import axios from "axios";
import { computed, inject } from "vue";

const hostname = inject("hostname");

const setting = defineModel<string>("setting", { required: true });
const value = defineModel<boolean | number | string | object>("value", {
  required: true,
});

const is_bool = computed(() => {
  return typeof value.value == "boolean";
});

const is_string = computed(() => {
  return (
    typeof value.value == "string" ||
    typeof value.value == "number" ||
    typeof value.value == "object"
  );
});

function update_setting(
  field: string,
  new_value: boolean | number | string | object
) {
  console.log("want to update " + setting + " to " + new_value);

  axios
    .post(hostname + "/command", {
      Settings: { Set: { settings: { [field]: new_value } } },
    })
    .then((result) => console.log(result));
}
</script>

<template>
  <v-text-field v-if="is_string" :label="setting" v-model="value" clearable hide-details>
    <template v-slot:append> <v-btn class="mr-0 ml-2 mb-1 p-0" @click="update_setting(setting, value)" color="primary">
        Submit
      </v-btn>
    </template>
  </v-text-field>
  <v-switch color="primary" v-if="is_bool" :label="setting" v-model="value" hide-details>
    <template v-slot:append> <v-btn class="mr-0 ml-2 mb-1 p-0" @click="update_setting(setting, value)" color="primary">
        Submit
      </v-btn>
    </template>
  </v-switch>
</template>
