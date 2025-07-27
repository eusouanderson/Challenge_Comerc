<template>
  <Button variant="primary" @click="handleLogout"> Logout </Button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/atoms/Button.vue';

const router = useRouter();

function handleLogout() {
  localStorage.removeItem('client');
  router.push('/login');
}
</script>
