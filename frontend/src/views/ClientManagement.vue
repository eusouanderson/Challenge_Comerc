<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Gerenciamento de Clientes</h1>
    <Button variant="primary" @click="showModal = true">Novo Cliente</Button>
    <ClientList :clients="clients" @edit="onEditClient" @deactivate="onDeactivateClient" />
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

const {
  items: clients,
  editingItem: editingClient,
  showModal,
  errorMessage,
  openModal,
  closeModal,
  onEdit: onEditClient,
  onDeactivate: onDeactivateClient,
  onSave: onSaveClient,
} = useEntityManagement<Client>(
  {
    list: ClientService.listClients,
    create: ClientService.createClient,
    update: ClientService.updateClient,
    deactivate: (id) => ClientService.updateClient(id, { status: 'inactive' }),
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
</script>
