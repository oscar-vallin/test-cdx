import { UiOptions } from 'src/data/services/graphql';

export const uiOptions: UiOptions[] = [
  {
    key: 'ignoreMe',
    values: [],
  },
  {
    key: 'fieldOpts',
    values: [
      {
        value: '1',
        label: 'One',
      },
      {
        value: '2',
        label: 'Two',
      },
      {
        value: '3',
        label: 'Three',
      },
      {
        value: '4',
        label: 'Four',
      },
      {
        value: '5',
        label: 'Five',
      },
    ],
  },
  {
    key: 'ignoreMeToo',
    values: [],
  },
  {
    key: 'OneOption',
    values: [
      {
        value: '7',
        label: 'Seven',
      },
    ]
  },
];

export const expectNoIcons = (wrapper) => {
  expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(0);
  expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(0);
};

export const expectInfoIcon = (wrapper) => {
  expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
  expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(0);
};

export const expectInfoWarningIcons = (wrapper) => {
  expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
  expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(1);
};
