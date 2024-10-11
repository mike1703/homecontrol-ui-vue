<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-app-bar title="Homecontrol"></v-app-bar>
    <v-navigation-drawer width="150" permanent nav>
      <v-list>
        <v-list-item link :to="{ name: 'Settings' }" title="Settings"></v-list-item>
        <v-list-item link :to="{ name: 'Commands' }" title="Commands"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
