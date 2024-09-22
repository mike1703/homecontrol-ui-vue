<script setup>
const setting = defineModel('setting')
const value = defineModel('value')

function input_type(value) {
    let type_id = typeof (value);
    if (type_id == "number") {
        return "text"
    }
    if (type_id == "string") {
        return "text"
    }
    if (type_id == "boolean") {
        return "checkbox"
    }
    if (type_id == "object") {
        console.log("value is of type object");
        return "text"
    }
}

</script>

<template>
    <div>
        <label :for=setting>{{ setting }}</label>
        <input :id="setting" :type="input_type(value)" v-model="value">
    </div>
</template>