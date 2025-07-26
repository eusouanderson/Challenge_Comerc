<template>
  <div class="text-text">
    <div class="flex mb-6 gap-3">
      <Input v-model="search" placeholder="Buscar por nome ou CPF" class="flex-1" />
      <select
        v-model="filterStatus"
        class="bg-surface border border-primary/30 rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-accent focus:border-transparent"
      >
        <option value="">Todos</option>
        <option value="active">Ativos</option>
        <option value="inactive">Inativos</option>
      </select>
    </div>

    <table class="w-full table-auto border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr class="bg-surface">
          <th class="p-4 text-left font-semibold text-accent">Nome</th>
          <th class="p-4 text-left font-semibold text-accent">CPF</th>
          <th class="p-4 text-left font-semibold text-accent">Status</th>
          <th class="p-4 text-left font-semibold text-accent">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="client in filteredClients"
          :key="client.id"
          class="border-t border-primary/10 hover:bg-surface/50 transition-colors"
        >
          <td class="p-4">{{ client.name }} {{ client.lastname }}</td>
          <td class="p-4 text-muted">{{ client.cpf }}</td>
          <td class="p-4">
            <span
              :class="{
                'text-accent': client.status === 'active',
                'text-secondary': client.status === 'inactive',
              }"
            >
              {{ client.status === 'active' ? 'Ativo' : 'Inativo' }}
            </span>
          </td>
          <td class="p-4 space-x-4">
            <button
              @click="$emit('edit', client)"
              class="text-primary hover:text-accent transition-colors"
            >
              Editar
            </button>
            <button
              @click="$emit('deactivate', client)"
              class="text-secondary hover:text-accent transition-colors"
            >
              {{ client.status === 'active' ? 'Desativar' : 'Reativar' }}
            </button>
          </td>
        </tr>
        <tr v-if="filteredClients.length === 0">
          <td colspan="4" class="p-8 text-center text-muted bg-surface/50">
            Nenhum cliente encontrado
          </td>
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
