<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { HomeControlCommandResult } from './common';
import { command } from './helper';

// Broetje
interface BroetjeCommandResult {
    Broetje: Broetje
}

interface Broetje {
    FieldList: BroetjeFieldListResults
}

interface BroetjeFieldListResults {
    fields: BroetjeFieldListResult[]
}

interface BroetjeFieldListResult {
    id: number,
    description: string,
}


// Settings
interface SettingsCommandResult {
    Settings: Settings
}

interface Settings {
    Setting: Setting
    Config: any
}

interface Setting {
    key: string,
    // note: this is always a String and has to be parsed before it can be used
    value: string
}


/** generic Broetje command */
function command_broetje(data: object | string) {
    const broetje_command = { Broetje: data }
    return command<HomeControlCommandResult<BroetjeCommandResult>>(broetje_command);
}

const fields = ref()
const configured_broetje_fields = ref()

/** fetch all known Broetje Fields */
function get_all_fields() {
    load_broetje_settings()
    const get_field_list_command = "ListAllFields"
    command_broetje(get_field_list_command).then((response) => fields.value = response.data.appliance_message.Command.command_result.Broetje.FieldList.fields);
    console.log(fields.value);
}

/** load the broetje settings */
async function load_broetje_settings() {
    const load_broetje_setting_command = {
        Settings: { Get: { key: "broetje_request_fields" } }
    };
    command<HomeControlCommandResult<SettingsCommandResult>>(load_broetje_setting_command).then(
        (homecontrol_response) => {
            configured_broetje_fields.value = JSON.parse(homecontrol_response.data.appliance_message.Command.command_result.Settings.Setting.value);
            console.log(configured_broetje_fields.value);
        }

    );
}

/** configure the selected broetje fields */
async function set_broetje_request_fields() {
    let fields = configured_broetje_fields.value
    const set_broetje_request_fields_command = {
        Settings: {
            Set: { settings: { broetje_request_fields: fields } }
        }
    }
    command<HomeControlCommandResult<SettingsCommandResult>>(set_broetje_request_fields_command).then(
        (homecontrol_response) =>
        (console.log(
            homecontrol_response.data.appliance_message.Command.command_result.Settings.Config))
    );
}

onMounted(async () => {
    get_all_fields();
});

</script>

<template>
    <v-data-table :items="fields" density="compact" show-select item-value="field_id"
        v-model="configured_broetje_fields">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Broetje request fields</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn class="mb-2" color="primary" dark @click="set_broetje_request_fields()">
                    Save
                </v-btn>
            </v-toolbar>
        </template>
    </v-data-table>
</template>
