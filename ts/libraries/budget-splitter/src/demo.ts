// nodemon -x npx ts-node ./demo.ts -w .

import { BudgetSplitter } from './budget-splitter.js';
import type { BudgetSplitterItemData } from './types.js';

console.log('\n\nBudgetSplitter demo\n===================\n\n');

const totalMoney = 30_000;
const totalTime = 200;
const initialItems: BudgetSplitterItemData[] = [
  {
    id: 'one',
    money: 10_200,
    time: 68,
    percentage: 34,
  },
  {
    id: 'two',
    money: 15_000,
    time: 100,
    percentage: 50,
  },
  {
    id: 'three',
    money: 4_800,
    time: 32,
    percentage: 16,
  },
];

console.log('total money', totalMoney);
console.log('total time', totalTime);
console.log('initial items', initialItems);

const budgetSplitter = new BudgetSplitter(totalMoney, totalTime, initialItems);
// budgetSplitter.setRecalculateItemsFlag(false);

budgetSplitter.setNotifier(
  (message: string, items: BudgetSplitterItemData[]) => {
    console.log('\nNotified');
    console.log('========');
    console.log(message);
    console.log('Items', items);

    const totalItems = {
      money: items.reduce((t, i) => (t += i.money), 0),
      time: items.reduce((t, i) => (t += i.time), 0),
      percentage: items.reduce((t, i) => (t += i.percentage), 0),
    };

    if (totalItems.money !== totalMoney) {
      console.log('ERROR: Total money does not match');
    } else if (totalItems.time !== totalTime) {
      console.log('ERROR: Total time does not match');
    } else if (totalItems.percentage !== 100) {
      console.log('ERROR: Total percentage does not match');
    } else {
      console.log('Totals OK');
    }

    console.log('\n');
  },
);

// budgetSplitter.updateItemMoney('one', 24_000);
budgetSplitter.updateItemPercentage('two', 100);
budgetSplitter.updateItemPercentage('one', 30);
budgetSplitter.updateItemPercentage('three', 66);

budgetSplitter.updateItemMoney('one', totalMoney / 2);
// budgetSplitter.updateItemPercentage('two', 40);
// budgetSplitter.updateItemPercentage('one', 40);
// budgetSplitter.updateItemMoney('two', 30_001);
// budgetSplitter.updateItemMoney('two', 4_500);
