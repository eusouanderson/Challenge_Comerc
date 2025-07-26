<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block font-semibold mb-1">Nome</label>
      <Input v-model="form.name" placeholder="Nome completo" />
    </div>

    <div>
      <label class="block font-semibold mb-1">E-mail</label>
      <Input type="email" v-model="form.email" placeholder="exemplo@dominio.com" required />
    </div>

    <div>
      <label class="block font-semibold mb-1">Documento</label>
      <Input v-model="form.document" placeholder="Documento" />
    </div>

    <div>
      <label class="block font-semibold mb-1">Senha</label>
      <Input
        type="password"
        v-model="form.password"
        placeholder="Senha"
        :required="!props.modelValue"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">Status</label>
      <select v-model="form.status" class="border rounded p-2 w-full">
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>
    </div>

    <Button type="submit" variant="primary">Salvar</Button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Input from '@/components/atoms/Input.vue';
import Button from '@/components/atoms/Button.vue';

const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(['save']);

const form = reactive({
  name: props.modelValue?.name || '',
  email: props.modelValue?.email || '',
  document: props.modelValue?.document || '',
  password: '',
  status: props.modelValue?.status || 'active',
});

function handleSubmit() {
  if (!form.name || !form.email || !form.document || (props.modelValue ? false : !form.password)) {
    alert('Preencha todos os campos obrigatórios');
    return;
  }

  emit('save', { ...form });
}
</script>
