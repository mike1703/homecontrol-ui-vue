<script setup lang="ts">
import GasMeter from "./commands/GasMeter.vue";
import Reboot from "./commands/Reboot.vue";
import Update from "./commands/Update.vue";
</script>

<template>
  <v-list width="600">
    <v-list-item>
      <Reboot />
    </v-list-item>
    <v-list-item>
      <Update />
    </v-list-item>
    <v-list-item>
      <GasMeter />
    </v-list-item>
  </v-list>
</template>
