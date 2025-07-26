// @ts-nocheck
import Input from '@/components/atoms/Input.vue';
import UserList from '@/components/organisms/UserList.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('UserList.vue', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      document: '123.456.789-00',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      document: '987.654.321-00',
      status: 'inactive',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      document: '456.123.789-00',
      status: 'active',
    },
  ];

  it('renders correctly with users', () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll('tbody tr').length).toBe(mockUsers.length);
    expect(wrapper.find('th:nth-child(1)').text()).toBe('Nome');
    expect(wrapper.find('th:nth-child(2)').text()).toBe('Documento');
  });

  it('shows empty state when no users', () => {
    const wrapper = mount(UserList, {
      props: {
        users: [],
      },
    });

    expect(wrapper.find('td[colspan="4"]').text()).toContain('Nenhum usuário encontrado');
  });

  it('filters users by name search', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    const searchInput = wrapper.findComponent(Input);
    await searchInput.setValue('John');

    expect(wrapper.findAll('tbody tr').length).toBe(2); // John Doe and Bob Johnson
  });

  it('filters users by document search', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    const searchInput = wrapper.findComponent(Input);
    await searchInput.setValue('123');

    expect(wrapper.findAll('tbody tr').length).toBe(2); // 123.456.789-00 and 456.123.789-00
  });

  it('filters users by active status', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    const statusSelect = wrapper.find('select');
    await statusSelect.setValue('active');

    expect(wrapper.findAll('tbody tr').length).toBe(2); // John Doe and Bob Johnson
    expect(wrapper.find('tbody tr:first-child td:nth-child(3)').text()).toBe('Ativo');
  });

  it('filters users by inactive status', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    const statusSelect = wrapper.find('select');
    await statusSelect.setValue('inactive');

    expect(wrapper.findAll('tbody tr').length).toBe(1); // Jane Smith
    expect(wrapper.find('tbody tr td:nth-child(3)').text()).toBe('Inativo');
  });

  it('emits edit event with user data', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    const firstEditButton = wrapper.findAll('button')[0];
    await firstEditButton.trigger('click');

    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit')[0]).toEqual([mockUsers[0]]);
  });

  it('emits deactivate event with user data', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    const firstDeactivateButton = wrapper.findAll('button')[1];
    await firstDeactivateButton.trigger('click');

    expect(wrapper.emitted('deactivate')).toBeTruthy();
    expect(wrapper.emitted('deactivate')[0]).toEqual([mockUsers[0]]);
  });

  it('displays status correctly', () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    const statusCells = wrapper.findAll('td:nth-child(3)');
    expect(statusCells[0].text()).toBe('Ativo');
    expect(statusCells[1].text()).toBe('Inativo');
    expect(statusCells[2].text()).toBe('Ativo');
  });

  it('combines filters correctly', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
      },
    });

    // Set both search and status filter
    await wrapper.findComponent(Input).setValue('John');
    await wrapper.find('select').setValue('active');

    expect(wrapper.findAll('tbody tr').length).toBe(2);
    expect(wrapper.find('tbody tr td:first-child').text()).toBe('John Doe');
  });
});
