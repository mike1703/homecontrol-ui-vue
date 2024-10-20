<script setup lang="ts">
import { computed } from "vue";
import { command } from "./commands/helper";


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
    typeof value.value == "object"
  );
});

const is_number = computed(() => {
  return (typeof value.value == "number");
});

// this is just a ugly workaround to have a number_value for v-number-input...
// this just wraps value.value and explicitly types it. this is only used on is_number == true
const number_value = computed({
  get: () => {
    if (is_number) {
      return (<number>value.value)
    }
    else { return 0 }
  },
  set: (val) => {
    value.value = val
  }
});

function update_setting(
  field: string,
  new_value: boolean | number | string | object
) {
  console.log("want to update " + setting + " to " + new_value);

  const update_setting_command = { Settings: { Set: { settings: { [field]: new_value } } } }
  command(update_setting_command).then((result) => console.log(result));
}
</script>

<template>
  <v-text-field v-if="is_string" :label="setting" v-model="value" clearable hide-details>
    <template v-slot:append> <v-btn class="mr-0 ml-2 mb-1 p-0" @click="update_setting(setting, value)" color="primary">
        Submit
      </v-btn>
    </template>
  </v-text-field>
  <v-number-input v-if="is_number" :label="setting" v-model="number_value" clearable hide-details>
    <template v-slot:append> <v-btn class="mr-0 ml-2 mb-1 p-0" @click="update_setting(setting, value)" color="primary">
        Submit
      </v-btn>
    </template>
  </v-number-input>
  <v-switch color="primary" v-if="is_bool" :label="setting" v-model="value" hide-details>
    <template v-slot:append> <v-btn class="mr-0 ml-2 mb-1 p-0" @click="update_setting(setting, value)" color="primary">
        Submit
      </v-btn>
    </template>
  </v-switch>
</template>
