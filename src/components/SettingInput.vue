<script setup lang="ts">
import axios from "axios";
import { inject } from "vue";

const hostname = inject("hostname");

const setting = defineModel<string>("setting", { required: true });
const value = defineModel<boolean | number | string | object>("value", {
  required: true,
});

function input_type(value: any) {
  let type_id = typeof value;
  if (type_id == "number") {
    return "text";
  }
  if (type_id == "string") {
    return "text";
  }
  if (type_id == "boolean") {
    return "checkbox";
  }
  if (type_id == "object") {
    console.log("value is of type object");
    return "text";
  }
  console.log("this is a fallback for unhandled type", type_id, value);
  return "text";
}

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
  <div>
    <label :for="setting">{{ setting }}</label>
    <input :id="setting" :type="input_type(value)" v-model="value" />
    <button @click="update_setting(setting, value)">Update</button>
  </div>
</template>
