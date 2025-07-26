<template>
  <div>
    <div class="flex mb-4">
      <Input v-model="search" placeholder="Buscar por nome ou documento" />
      <select v-model="filterStatus" class="ml-2 border rounded p-2">
        <option value="">Todos</option>
        <option value="active">Ativos</option>
        <option value="inactive">Inativos</option>
      </select>
    </div>

    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 p-2">Nome</th>
          <th class="border border-gray-300 p-2">Documento</th>
          <th class="border border-gray-300 p-2">Status</th>
          <th class="border border-gray-300 p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2">{{ user.name }}</td>
          <td class="border border-gray-300 p-2">{{ user.document }}</td>
          <td class="border border-gray-300 p-2">
            {{ user.status === 'active' ? 'Ativo' : 'Inativo' }}
          </td>
          <td class="border border-gray-300 p-2 space-x-2">
            <button @click="$emit('edit', user)" class="text-blue-600 hover:underline">
              Editar
            </button>
            <button @click="$emit('deactivate', user)" class="text-red-600 hover:underline">
              Desativar
            </button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="4" class="p-4 text-center text-gray-500">Nenhum usuário encontrado</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Input from '@/components/atoms/Input.vue';

const props = defineProps<{ users: Array<any> }>();
const emit = defineEmits(['edit', 'deactivate']);

const search = ref('');
const filterStatus = ref('');

const filteredUsers = computed(() => {
  return props.users.filter((user) => {
    const name = user.name?.toLowerCase() ?? '';
    const document = user.document?.toLowerCase() ?? '';
    const matchSearch =
      name.includes(search.value.toLowerCase()) || document.includes(search.value.toLowerCase());

    const matchStatus = filterStatus.value ? user.status === filterStatus.value : true;

    return matchSearch && matchStatus;
  });
});
</script>
