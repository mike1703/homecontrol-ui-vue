<script setup lang="ts">
import GasMeter from "./commands/GasMeter.vue";
import Reboot from "./commands/Reboot.vue";
import Ota from "./commands/Ota.vue";
import Broetje from "./commands/Broetje.vue";
</script>

<template>
  <v-list width="600">
    <v-list-item>
      <Reboot />
    </v-list-item>
    <v-list-item>
      <Ota />
    </v-list-item>
    <v-list-item>
      <GasMeter />
    </v-list-item>
    <v-list-item>
      <Broetje />
    </v-list-item>
  </v-list>
</template>
