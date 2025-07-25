<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block font-semibold mb-1" for="name">Nome</label>
      <Input id="name" v-model="form.name" placeholder="Nome" required />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="lastname">Sobrenome</label>
      <Input id="lastname" v-model="form.lastname" placeholder="Sobrenome" required />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="email">E-mail</label>
      <Input
        id="email"
        type="email"
        v-model="form.email"
        placeholder="exemplo@dominio.com"
        required
      />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="cpf">CPF</label>
      <Input
        id="cpf"
        v-model="form.cpf"
        placeholder="CPF (somente números ou formatado)"
        required
      />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="cell">Celular</label>
      <Input id="cell" v-model="form.cell" placeholder="(XX) XXXXX-XXXX" required />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="cep">CEP</label>
      <Input id="cep" v-model="form.cep" placeholder="CEP" required @blur="fetchAddress" />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="street">Logradouro</label>
      <Input
        id="street"
        v-model="form.street"
        placeholder="Rua, Avenida, etc."
        required
        :disabled="autoFilled"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="neighborhood">Bairro</label>
      <Input
        id="neighborhood"
        v-model="form.neighborhood"
        placeholder="Bairro"
        required
        :disabled="autoFilled"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="city">Cidade</label>
      <Input id="city" v-model="form.city" placeholder="Cidade" required :disabled="autoFilled" />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="uf">UF</label>
      <Input
        id="uf"
        v-model="form.uf"
        placeholder="UF"
        maxlength="2"
        required
        :disabled="autoFilled"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="password">Senha</label>
      <Input
        id="password"
        type="password"
        v-model="form.password"
        placeholder="Senha"
        :required="!props.modelValue"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1" for="status">Status</label>
      <select id="status" v-model="form.status" class="border rounded p-2 w-full">
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>
    </div>

    <Button type="submit" variant="primary">Salvar</Button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, defineProps, watch } from 'vue';
import Input from '@/components/atoms/Input.vue';
import Button from '@/components/atoms/Button.vue';

const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(['save']);

const autoFilled = ref(false);

const form = reactive({
  name: props.modelValue?.name || '',
  lastname: props.modelValue?.lastname || '',
  email: props.modelValue?.email || '',
  cpf: props.modelValue?.cpf || '',
  cell: props.modelValue?.cell || '',
  cep: props.modelValue?.cep || '',
  street: props.modelValue?.street || '',
  neighborhood: props.modelValue?.neighborhood || '',
  city: props.modelValue?.city || '',
  uf: props.modelValue?.uf || '',
  password: '',
  status: props.modelValue?.status || 'active',
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      Object.assign(form, newVal);
      form.password = '';
    }
  }
);

async function fetchAddress() {
  const cep = form.cep.replace(/\D/g, '');
  if (cep.length !== 8) {
    autoFilled.value = false;
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      autoFilled.value = false;
      return;
    }

    form.street = data.logradouro;
    form.neighborhood = data.bairro;
    form.city = data.localidade;
    form.uf = data.uf;
    autoFilled.value = true;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    autoFilled.value = false;
  }
}

function handleSubmit() {
  if (
    !form.name ||
    !form.lastname ||
    !form.email ||
    !form.cpf ||
    !form.cell ||
    !form.cep ||
    !form.street ||
    !form.neighborhood ||
    !form.city ||
    !form.uf ||
    (props.modelValue ? false : !form.password)
  ) {
    alert('Preencha todos os campos obrigatórios');
    return;
  }

  emit('save', { ...form });
}
</script>
