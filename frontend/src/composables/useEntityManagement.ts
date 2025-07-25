import { onMounted, ref } from 'vue';

export function useEntityManagement<T>(
  service: {
    list: () => Promise<T[]>;
    create: (data: Partial<T>) => Promise<any>;
    update: (id: string, data: Partial<T>) => Promise<any>;
    deactivate?: (id: string) => Promise<any>;
  },
  defaultData: () => Partial<T>
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
      // @ts-ignore -
      await service.deactivate(item.id);
      await fetchItems();
    } catch (error) {
      console.error('Erro ao desativar item:', error);
      errorMessage.value = 'Erro ao desativar item';
    }
  }

  async function onSave(data: Partial<T>) {
    try {
      errorMessage.value = null;

      if (editingItem.value) {
        // @ts-ignore -
        await service.update(editingItem.value.id, data);
      } else {
        await service.create({
          ...defaultData(),
          ...data,
        });
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
