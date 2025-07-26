<template>
  <div class="text-text">
    <div class="flex mb-6 gap-3">
      <Input v-model="search" placeholder="Buscar por nome ou documento" class="flex-1" />
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
          <th class="p-4 text-left font-semibold text-accent">Documento</th>
          <th class="p-4 text-left font-semibold text-accent">Status</th>
          <th class="p-4 text-left font-semibold text-accent">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
          class="border-t border-primary/10 hover:bg-surface/50 transition-colors"
        >
          <td class="p-4">{{ user.name }}</td>
          <td class="p-4 text-muted">{{ user.document }}</td>
          <td class="p-4">
            <span
              :class="{
                'text-accent': user.status === 'active',
                'text-secondary': user.status === 'inactive',
              }"
            >
              {{ user.status === 'active' ? 'Ativo' : 'Inativo' }}
            </span>
          </td>
          <td class="p-4 space-x-4">
            <button
              @click="$emit('edit', user)"
              class="text-primary hover:text-accent transition-colors"
            >
              Editar
            </button>
            <button
              @click="$emit('deactivate', user)"
              class="text-secondary hover:text-accent transition-colors"
            >
              {{ user.status === 'active' ? 'Desativar' : 'Reativar' }}
            </button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="4" class="p-8 text-center text-muted bg-surface/50">
            Nenhum usuário encontrado
          </td>
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
