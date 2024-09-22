<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue';
import SettingInput from './SettingInput.vue';

let data = reactive({ settings: {} })

async function load_data() {
    let local_host = "localhost:8080";
    axios.post("http://" + local_host + "/command",
        { Settings: "Export" },
    ).then(homecontrol_response => data.settings = homecontrol_response.data.Result.appliance_message.Command.command_result.Settings.Config.settings);
}
onMounted(async () => {
    await load_data()
})
</script>

<template>
    {{ data }}
    <div class="settings">
        <li v-for="(value, setting) in data.settings">
            <SettingInput :setting :value />
        </li>
    </div>
</template>