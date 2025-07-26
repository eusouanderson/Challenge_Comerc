<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
    <Button variant="primary" @click="showModal = true">Novo Usuário</Button>
    <UserList :users="users" @edit="onEditUser" @deactivate="onToggleUserStatus" />
    <Modal :visible="showModal" @close="closeModal">
      <template #title>
        {{ editingUser ? 'Editar Usuário' : 'Novo Usuário' }}
      </template>
      <GlobalError :errorMessage="errorMessage" @clear="errorMessage = ''" />
      <UserForm :modelValue="editingUser" @save="onSaveUser" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import UserList from '@/components/organisms/UserList.vue';
import UserForm from '@/components/molecules/UserForm.vue';
import Modal from '@/components/atoms/Modal.vue';
import Button from '@/components/atoms/Button.vue';
import { UserService, type User } from '@/api/user.service';
import GlobalError from '@/components/atoms/GlobalError.vue';
import { useEntityManagement } from '@/composables/useEntityManagement';

const {
  items: users,
  editingItem: editingUser,
  showModal,
  errorMessage,
  closeModal,
  onEdit: onEditUser,
  onDeactivate: onDeactivateUser,
  onSave: onSaveUser,
  fetchItems,
} = useEntityManagement<User>(
  {
    list: UserService.listUsers,
    create: UserService.createUser,
    update: UserService.updateUser,
  },
  () => ({
    name: '',
    document: '',
    email: '',
    password: '',
  })
);
const onToggleUserStatus = async (user: User) => {
  try {
    await UserService.updateUser(user.id, {
      status: user.status === 'active' ? 'inactive' : 'active',
    });
    await fetchItems();
  } catch (err) {
    console.error('Erro status, in:', err);
    errorMessage.value = 'Not found to change user status';
  }
};
</script>
