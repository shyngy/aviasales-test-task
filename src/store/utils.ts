import { OptionTab } from './types';

const transferCheckboxes = [
  {
    name: 'all', displayName: 'Все', checked: true,
  },
  {
    name: 'withoutTransfers', displayName: 'Без пересадок', checked: true, counter: 0,
  },
  {
    name: 'oneTransfers', displayName: '1 пересадка', checked: true, counter: 1,
  },
  {
    name: 'twoTransfers', displayName: '2 пересадки', checked: true, counter: 2,
  },
  {
    name: 'threeTransfers', displayName: '3 пересадки', checked: true, counter: 3,
  },
];

export const stopsLength = transferCheckboxes.reduce((acc: string[], item) => {
  if (item.name !== 'all') {
    acc.push(item.displayName);
  }
  return acc;
}, []);

const optionTabs: OptionTab[] = [
  { name: 'cheap', displayName: 'самый дешевый' },
  { name: 'fast', displayName: 'самый быстрый' },
  { name: 'optimal', displayName: 'оптимальный' },
];

export { transferCheckboxes, optionTabs };
