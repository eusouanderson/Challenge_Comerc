import { onMounted, ref } from 'vue';

export function useEntityManagement<T, TCreate = Partial<T>, TUpdate = Partial<T>>(
  service: {
    list: () => Promise<T[]>;
    create: (data: TCreate) => Promise<T>;
    update: (id: string, data: TUpdate) => Promise<T>;
    deactivate?: (id: string) => Promise<T>;
  },
  defaultData: () => TCreate
) {
  const items = ref<T[]>([]);
  const editingItem = ref<T | null>(null);
  const showModal = ref(false);
  const errorMessage = ref<string | null>(null);

  async function fetchItems() {
    try {
      items.value = await service.list();
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
      errorMessage.value = 'Erro ao carregar itens';
    }
  }

  onMounted(fetchItems);

  function openModal() {
    editingItem.value = null;
    showModal.value = true;
    errorMessage.value = null;
  }

  function closeModal() {
    showModal.value = false;
    editingItem.value = null;
    errorMessage.value = null;
  }

  function onEdit(item: T) {
    editingItem.value = { ...item };
    showModal.value = true;
    errorMessage.value = null;
  }

  async function onDeactivate(item: T) {
    if (!service.deactivate) return;

    try {
      // @ts-expect-error: `id`
      await service.deactivate(item.id);
      await fetchItems();
    } catch (error) {
      console.error('Erro ao desativar item:', error);
      errorMessage.value = 'Erro ao desativar item';
    }
  }

  async function onSave(data: TCreate | TUpdate) {
    try {
      errorMessage.value = null;

      if (editingItem.value) {
        await service.update(editingItem.value.id, data as TUpdate);
      } else {
        await service.create({
          ...defaultData(),
          ...data,
        } as TCreate);
      }

      await fetchItems();
      closeModal();
    } catch (error: any) {
      let msg = error.message || 'Erro desconhecido ao salvar item';

      try {
        const parsed = JSON.parse(msg);
        if (parsed.message) msg = parsed.message;
      } catch {}

      errorMessage.value = msg;
    }
  }

  return {
    items,
    editingItem,
    showModal,
    errorMessage,
    openModal,
    closeModal,
    onEdit,
    onDeactivate,
    onSave,
    fetchItems,
  };
}
