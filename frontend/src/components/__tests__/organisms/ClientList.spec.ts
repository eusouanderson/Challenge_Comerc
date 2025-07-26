import Input from '@/components/atoms/Input.vue';
import ClientList from '@/components/organisms/ClientList.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('ClientList.vue', () => {
  const mockClients = [
    {
      id: 1,
      name: 'John',
      lastname: 'Doe',
      cpf: '12345678901',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane',
      lastname: 'Smith',
      cpf: '98765432109',
      status: 'inactive',
    },
    {
      id: 3,
      name: 'Bob',
      lastname: 'Johnson',
      cpf: '45612378903',
      status: 'active',
    },
  ];

  it('renders correctly with clients', () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll('tbody tr').length).toBe(mockClients.length);
  });

  it('shows empty state when no clients', () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: [],
      },
    });

    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('td[colspan="4"]').text()).toContain('Nenhum cliente encontrado');
  });

  it('filters clients by search term', async () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    const searchInput = wrapper.findComponent(Input);
    await searchInput.setValue('John');

    expect(wrapper.findAll('tbody tr').length).toBe(2); // John Doe and Bob Johnson
  });

  it('filters clients by CPF search', async () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    const searchInput = wrapper.findComponent(Input);
    await searchInput.setValue('123');

    expect(wrapper.findAll('tbody tr').length).toBe(2); // 12345678901 and 45612378903
  });

  it('filters clients by status', async () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    const statusSelect = wrapper.find('select');
    await statusSelect.setValue('active');

    expect(wrapper.findAll('tbody tr').length).toBe(2); // John Doe and Bob Johnson
  });

  it('emits edit event when edit button is clicked', async () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    const firstEditButton = wrapper.findAll('button')[0];
    await firstEditButton.trigger('click');

    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit')[0]).toEqual([mockClients[0]]);
  });

  it('emits deactivate event when deactivate button is clicked', async () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    const firstDeactivateButton = wrapper.findAll('button')[1];
    await firstDeactivateButton.trigger('click');

    expect(wrapper.emitted('deactivate')).toBeTruthy();
    expect(wrapper.emitted('deactivate')[0]).toEqual([mockClients[0]]);
  });

  it('combines name and lastname for search', async () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    const searchInput = wrapper.findComponent(Input);
    await searchInput.setValue('Doe');

    expect(wrapper.findAll('tbody tr').length).toBe(1);
    expect(wrapper.find('td').text()).toContain('John Doe');
  });

  it('displays status correctly', () => {
    const wrapper = mount(ClientList, {
      props: {
        clients: mockClients,
      },
    });

    const statusCells = wrapper.findAll('td:nth-child(3)');
    expect(statusCells[0].text()).toBe('Ativo');
    expect(statusCells[1].text()).toBe('Inativo');
  });
});
