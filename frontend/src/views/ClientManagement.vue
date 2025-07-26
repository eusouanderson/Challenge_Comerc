<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Gerenciamento de Clientes</h1>
    <Button variant="primary" @click="showModal = true">Novo Cliente</Button>
    <ClientList :clients="clients" @edit="onEditClient" @deactivate="onToggleClientStatus" />
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
import { ClientService, type Client } from '@/api/client.service';
import GlobalError from '@/components/atoms/GlobalError.vue';
import { useEntityManagement } from '@/composables/useEntityManagement';

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
  onDeactivate: onDeactivateClient,
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
</script>
