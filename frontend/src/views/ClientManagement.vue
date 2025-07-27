<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Gerenciamento de Clientes</h1>
    <Button variant="primary" @click="showModal = true">Novo Cliente</Button>
    <ClientList
      :clients="clients"
      @edit="onEditClient"
      @deactivate="onToggleClientStatus"
      @delete="onDeleteClient"
    />

    <Modal :visible="showModal" @close="closeModal">
      <template #title>
        {{ editingClient ? 'Editar Cliente' : 'Novo Cliente' }}
      </template>
      <GlobalError :errorMessage="errorMessage" @clear="errorMessage = ''" />
      <ClientForm :modelValue="editingClient" @save="onSaveClient" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import ClientList from '@/components/organisms/ClientList.vue';
import ClientForm from '@/components/molecules/ClientForm.vue';
import Modal from '@/components/atoms/Modal.vue';
import Button from '@/components/atoms/Button.vue';
import { ClientService } from '@/api/client.service';
import type { Client } from '@/interfaces/client';
import GlobalError from '@/components/atoms/GlobalError.vue';
import { useEntityManagement } from '@/composables/useEntityManagement';
import Swal from 'sweetalert2';

type CreateClientInput = Omit<Client, 'id' | 'status' | 'createdAt' | 'updatedAt'> & {
  password: string;
};

const {
  items: clients,
  editingItem: editingClient,
  showModal,
  errorMessage,
  closeModal,
  onEdit: onEditClient,
  onSave: onSaveClient,
  fetchItems,
} = useEntityManagement<Client, CreateClientInput, Partial<Client>>(
  {
    list: ClientService.listClients,
    create: ClientService.createClient,
    update: ClientService.updateClient,
  },
  () => ({
    name: '',
    lastname: '',
    cpf: '',
    email: '',
    cell: '',
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    uf: '',
    password: '',
  })
);

const onToggleClientStatus = async (client: Client) => {
  try {
    await ClientService.updateClient(client.id, {
      status: client.status === 'active' ? 'inactive' : 'active',
    });
    await fetchItems();
  } catch (err) {
    console.error('Error status, in :', err);
    errorMessage.value = 'Not found to change client status';
  }
};
const onDeleteClient = async (client: Client) => {
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: `Deseja deletar o cliente ${client.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, deletar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#e53e3e',
    cancelButtonColor: '#a0aec0',
  });

  if (!result.isConfirmed) return;

  try {
    await ClientService.deleteClient(client.id);
    await fetchItems();

    await Swal.fire({
      icon: 'success',
      title: 'Cliente deletado com sucesso',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error('Erro ao deletar:', err);

    await Swal.fire({
      icon: 'error',
      title: 'Erro ao deletar',
      text: 'Não foi possível deletar o cliente. Tente novamente mais tarde.',
    });

    errorMessage.value = 'Erro ao deletar o cliente.';
  }
};
</script>
