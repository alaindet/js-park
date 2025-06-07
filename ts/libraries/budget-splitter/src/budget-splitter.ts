import type {
  BudgetSplitterItemData,
  BudgetSplitterNotifier,
} from './types.js';
import { BudgetSplitterOutOfBoundError } from './errors.js';
import { BudgetSplitterItem } from './budget-splitter-item.js';

export class BudgetSplitter {
  private items: BudgetSplitterItem[] = [];
  private itemIndexById = new Map<BudgetSplitterItem['id'], number>();
  private _notifier?: BudgetSplitterNotifier;
  private _recalculateItems = true;
  private _totals = { money: 0, time: 0 };

  constructor(
    totalMoney: number,
    totalTime: number,
    items: BudgetSplitterItemData[],
  ) {
    this._totals = { money: totalMoney, time: totalTime };
    this.items = items.map((item) => BudgetSplitterItem.deserialize(item));
    this.reindexItems();
  }

  get totalMoney(): number {
    return this._totals.money;
  }

  set totalMoney(value: number) {
    this._totals.money = value;
    this.updateTotals('totalMoney');
  }

  get totalTime(): number {
    return this._totals.time;
  }

  set totalTime(value: number) {
    this._totals.time = value;
    this.updateTotals('totalTime');
  }

  setNotifier(
    fn: BudgetSplitterNotifier,
    options?: { runImmediately: boolean },
  ) {
    const runImmediately = !!options?.runImmediately;
    this._notifier = fn;
    if (runImmediately) {
      this.notify('Notifier first run');
    }
  }

  private updateTotals(message: string): void {
    this.items.forEach((item) => {
      item.updateTotals(this._totals);
    });
    this.notify(`Totals updated: ${message}`);
  }

  setRecalculateItemsFlag(recalculateItems: boolean): void {
    this._recalculateItems = recalculateItems;
  }

  addItemById(id: string): void {
    const item = new BudgetSplitterItem(id);
    item.money = 0;
    item.time = 0;
    item.percentage = 0;
    this.items.push(item);
    this.reindexItems();
    this.notify(`Added item by id: ${item.toString()}`);
  }

  updateItemMoney(id: string, money: number): void {
    if (money < 0 || money > this._totals.money) {
      throw BudgetSplitterOutOfBoundError('money');
    }

    const index = this.itemIndexById.get(id)!;
    const item = this.items[index]!;
    const [oldPerc, newPerc] = item.updateByMoney(money, this._totals);

    // If you're maxing one item, set every other item to zero
    if (money === this._totals.money) {
      this.setItemsToZero(id);
      this.notify(`Updated item to max money: ${item.toString()}`);
      return;
    }

    if (this._recalculateItems) {
      this.redistributeItems(item, oldPerc, newPerc);
    }

    this.notify(`Updated item money: ${item.toString()}`);
  }

  updateItemTime(id: string, time: number): void {
    if (time < 0 || time > this._totals.time) {
      throw BudgetSplitterOutOfBoundError('time');
    }

    const index = this.itemIndexById.get(id)!;
    const item = this.items[index]!;
    const [oldPerc, newPerc] = item.updateByTime(time, this._totals);

    // If you're maxing one item, set every other item to zero
    if (time === this._totals.time) {
      this.setItemsToZero(id);
      this.notify(`Updated item to max time: ${item.toString()}`);
      return;
    }

    if (this._recalculateItems) {
      this.redistributeItems(item, oldPerc, newPerc);
    }

    this.notify(`Updated item time: ${item.toString()}`);
  }

  updateItemPercentage(id: string, percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw BudgetSplitterOutOfBoundError('percentage');
    }

    const index = this.itemIndexById.get(id)!;
    const item = this.items[index]!;
    const [oldPerc, newPerc] = item.updateByPercentage(
      percentage,
      this._totals,
    );

    // If you're maxing one item, set every other item to zero
    if (percentage === 100) {
      this.setItemsToZero(id);
      this.notify(`Updated item max percentage: ${item.toString()}`);
      return;
    }

    if (this._recalculateItems) {
      this.redistributeItems(item, oldPerc, newPerc);
    }

    this.notify(`Updated item percentage: ${item.toString()}`);
  }

  deleteItem(id: string): void {
    const index = this.itemIndexById.get(id)!;
    const item = this.items[index]!;
    const itemString = item.toString();
    this.items.splice(index, 1);
    this.reindexItems();

    if (this._recalculateItems) {
      const index = this.itemIndexById.get(id)!;
      item.setToZero();
      this.redistributeItems(item, item.percentage, 0);
    }

    this.notify(`Deleted item: ${itemString}`);
  }

  private reindexItems(): void {
    this.itemIndexById = new Map<BudgetSplitterItem['id'], number>(
      this.items.map((item, index) => [item.id, index]),
    );
  }

  private notify(message: string): void {
    if (!this._notifier) {
      return;
    }

    const itemsData = this.items.map((item) => item.serialize());
    this._notifier(message, itemsData);
  }

  private redistributeItems(
    changedItem: BudgetSplitterItem,
    oldPercentage: number,
    newPercentage: number,
  ): void {
    const percentageChange = (100 - newPercentage) / (100 - oldPercentage);

    for (const item of this.items) {
      // Skip changed item
      if (item.id === changedItem.id) {
        continue;
      }

      // Skip items set to zero
      if (item.percentage === 0) {
        continue;
      }

      // Values are calculated as floats to assess residual errors later
      item.redistribute(percentageChange, this._totals);
    }
  }

  private setItemsToZero(changedItemId: BudgetSplitterItem['id']): void {
    for (const item of this.items) {
      // Skip changed item
      if (item.id === changedItemId) {
        continue;
      }

      item.setToZero();
    }
  }
}
