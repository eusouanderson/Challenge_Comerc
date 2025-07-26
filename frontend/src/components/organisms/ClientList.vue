<template>
  <div>
    <div class="flex mb-4">
      <Input v-model="search" placeholder="Buscar por nome ou CPF" />
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
          <th class="border border-gray-300 p-2">CPF</th>
          <th class="border border-gray-300 p-2">Status</th>
          <th class="border border-gray-300 p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2">{{ client.name }} {{ client.lastname }}</td>
          <td class="border border-gray-300 p-2">{{ client.cpf }}</td>
          <td class="border border-gray-300 p-2">
            {{ client.status === 'active' ? 'Ativo' : 'Inativo' }}
          </td>
          <td class="border border-gray-300 p-2 space-x-2">
            <button @click="$emit('edit', client)" class="text-blue-600 hover:underline">
              Editar
            </button>
            <button @click="$emit('deactivate', client)" class="text-red-600 hover:underline">
              Desativar
            </button>
          </td>
        </tr>
        <tr v-if="filteredClients.length === 0">
          <td colspan="4" class="p-4 text-center text-gray-500">Nenhum cliente encontrado</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Input from '@/components/atoms/Input.vue';

const props = defineProps<{ clients: Array<any> }>();
const emit = defineEmits(['edit', 'deactivate']);

const search = ref('');
const filterStatus = ref('');

const filteredClients = computed(() => {
  return props.clients.filter((client) => {
    const name = (client.name + ' ' + client.lastname).toLowerCase();
    const cpf = client.cpf?.toLowerCase() ?? '';
    const matchSearch =
      name.includes(search.value.toLowerCase()) || cpf.includes(search.value.toLowerCase());

    const matchStatus = filterStatus.value ? client.status === filterStatus.value : true;

    return matchSearch && matchStatus;
  });
});
</script>
