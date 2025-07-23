<template>
  <UserManagement />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserManagement from './views/UserManagement.vue';

export default defineComponent({
  name: 'App',
  components: {
    UserManagement,
  },
});
</script>
