<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
    <Button variant="primary" @click="showModal = true">Novo Usuário</Button>

    <!-- Atualizado para incluir evento delete -->
    <UserList
      :users="users"
      @edit="onEditUser"
      @deactivate="onToggleUserStatus"
      @delete="onDeleteUser"
    />

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
import { UserService } from '@/api/user.service';
import type { User } from '@/interfaces/user';
import GlobalError from '@/components/atoms/GlobalError.vue';
import { useEntityManagement } from '@/composables/useEntityManagement';
import Swal from 'sweetalert2';

const {
  items: users,
  editingItem: editingUser,
  showModal,
  errorMessage,
  closeModal,
  onEdit: onEditUser,
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
    errorMessage.value = 'Não foi possível alterar o status do usuário.';
  }
};

const onDeleteUser = async (user: User) => {
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: `Deseja deletar o usuário ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, deletar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#e53e3e',
    cancelButtonColor: '#a0aec0',
  });

  if (!result.isConfirmed) return;

  try {
    await UserService.deleteUser(user.id);
    await fetchItems();

    await Swal.fire({
      icon: 'success',
      title: 'Usuário deletado com sucesso',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error('Erro ao deletar:', err);

    await Swal.fire({
      icon: 'error',
      title: 'Erro ao deletar',
      text: 'Não foi possível deletar o usuário. Tente novamente mais tarde.',
    });

    errorMessage.value = 'Erro ao deletar o usuário.';
  }
};
</script>
