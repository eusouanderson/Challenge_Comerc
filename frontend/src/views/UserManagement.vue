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
import { ref, onMounted } from 'vue';
import UserList from '@/components/organisms/UserList.vue';
import UserForm from '@/components/molecules/UserForm.vue';
import Modal from '@/components/atoms/Modal.vue';
import Button from '@/components/atoms/Button.vue';
import { UserService, type User } from '@/api/user.service';

const users = ref<User[]>([]);
const showModal = ref(false);
const editingUser = ref<User | null>(null);

const fetchUsers = async () => {
  try {
    users.value = await UserService.listUsers();
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
};

onMounted(fetchUsers);

function closeModal() {
  showModal.value = false;
  editingUser.value = null;
}

function onEditUser(user: User) {
  editingUser.value = { ...user };
  showModal.value = true;
}

async function onDeactivateUser(user: User) {
  try {
    await UserService.updateUser(user.id, { status: 'inactive' });
    await fetchUsers();
  } catch (error) {
    console.error('Erro ao desativar usuário:', error);
  }
}

async function onSaveUser(userData: Partial<User>) {
  try {
    if (editingUser.value) {
      // Atualizar
      await UserService.updateUser(editingUser.value.id, userData);
    } else {
      // Criar
      await UserService.createUser({
        name: userData.name || '',
        document: userData.document || '',
        email: userData.email || '',
        password: userData.password || '',
      });
    }

    await fetchUsers();
    closeModal();
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
  }
}
</script>
