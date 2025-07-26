import MovieViewToggle from '@/components/organisms/MovieViewToggle.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('MovieViewToggle.vue', () => {
  it('renders both toggle buttons', () => {
    const wrapper = mount(MovieViewToggle, {
      props: {
        currentView: 'all',
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toBe('All Movies');
    expect(buttons[1].text()).toBe('My Movies');
  });

  it('applies active styles for "all" view', () => {
    const wrapper = mount(MovieViewToggle, {
      props: {
        currentView: 'all',
      },
    });

    const allButton = wrapper.find('button:first-child');
    const mineButton = wrapper.find('button:last-child');

    expect(allButton.classes()).toContain('bg-blue-500');
    expect(allButton.classes()).toContain('text-white');
    expect(mineButton.classes()).toContain('bg-gray-200');
    expect(mineButton.classes()).toContain('text-gray-600');
  });

  it('applies active styles for "mine" view', () => {
    const wrapper = mount(MovieViewToggle, {
      props: {
        currentView: 'mine',
      },
    });

    const allButton = wrapper.find('button:first-child');
    const mineButton = wrapper.find('button:last-child');

    expect(mineButton.classes()).toContain('bg-blue-500');
    expect(mineButton.classes()).toContain('text-white');
    expect(allButton.classes()).toContain('bg-gray-200');
    expect(allButton.classes()).toContain('text-gray-600');
  });

  it('emits viewChanged event with "all" when first button clicked', async () => {
    const wrapper = mount(MovieViewToggle, {
      props: {
        currentView: 'mine', // Start with mine view
      },
    });

    await wrapper.find('button:first-child').trigger('click');
    expect(wrapper.emitted('viewChanged')).toBeTruthy();
    expect(wrapper.emitted('viewChanged')?.[0]).toEqual(['all']);
  });

  it('emits viewChanged event with "mine" when second button clicked', async () => {
    const wrapper = mount(MovieViewToggle, {
      props: {
        currentView: 'all', // Start with all view
      },
    });

    await wrapper.find('button:last-child').trigger('click');
    expect(wrapper.emitted('viewChanged')).toBeTruthy();
    expect(wrapper.emitted('viewChanged')?.[0]).toEqual(['mine']);
  });

  it('has proper transition classes', () => {
    const wrapper = mount(MovieViewToggle, {
      props: {
        currentView: 'all',
      },
    });

    const buttons = wrapper.findAll('button');
    buttons.forEach((button) => {
      expect(button.classes()).toContain('transition-colors');
    });
  });

  it('has consistent button styling', () => {
    const wrapper = mount(MovieViewToggle, {
      props: {
        currentView: 'all',
      },
    });

    const buttons = wrapper.findAll('button');
    buttons.forEach((button) => {
      expect(button.classes()).toContain('px-6');
      expect(button.classes()).toContain('py-2');
      expect(button.classes()).toContain('font-bold');
      expect(button.classes()).toContain('rounded');
    });
  });
});
