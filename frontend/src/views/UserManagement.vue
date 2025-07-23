<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>

    <Button variant="primary" @click="showModal = true">Novo Usuário</Button>

    <UserList :users="users" @edit="onEditUser" @deactivate="onDeactivateUser" />

    <Modal :visible="showModal" @close="closeModal">
      <template #title>
        {{ editingUser ? 'Editar Usuário' : 'Novo Usuário' }}
      </template>

      <UserForm :modelValue="editingUser" @save="onSaveUser" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue';
import UserList from '@/components/organisms/UserList.vue';
import UserForm from '@/components/molecules/UserForm.vue';
import Modal from '@/components/atoms/Modal.vue';
import Button from '@/components/atoms/Button.vue';

interface User {
  id: string;
  name: string;
  document: string;
  password: string;
  status: 'active' | 'inactive';
}

const users = ref<User[]>([]);

// Load users do localStorage no mount
const loadUsers = () => {
  const saved = localStorage.getItem('users');
  if (saved) users.value = JSON.parse(saved);
};
loadUsers();

// Salva localStorage sempre que users mudar
watchEffect(() => {
  localStorage.setItem('users', JSON.stringify(users.value));
});

const showModal = ref(false);
const editingUser = ref<User | null>(null);

function closeModal() {
  showModal.value = false;
  editingUser.value = null;
}

function onEditUser(user: User) {
  editingUser.value = { ...user };
  showModal.value = true;
}

function onDeactivateUser(user: User) {
  const idx = users.value.findIndex((u) => u.id === user.id);
  if (idx !== -1) {
    users.value[idx].status = 'inactive';
  }
}

function onSaveUser(userData: Partial<User>) {
  if (editingUser.value) {
    // Atualizar
    const idx = users.value.findIndex((u) => u.id === editingUser.value?.id);
    if (idx !== -1) {
      users.value[idx] = { ...users.value[idx], ...userData };
    }
  } else {
    // Criar novo usuário
    users.value.push({
      id: crypto.randomUUID(),
      name: userData.name || '',
      document: userData.document || '',
      password: userData.password || '',
      status: (userData.status as 'active' | 'inactive') || 'active',
    });
  }
  closeModal();
}
</script>
