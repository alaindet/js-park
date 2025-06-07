import type { BudgetSplitterItemData, BudgetSplitterTotals } from './types.js';

export class BudgetSplitterItem {
  id: string;
  money: number;
  time: number;
  percentage: number;

  constructor(id: string) {
    this.id = id;
    this.money = 0;
    this.time = 0;
    this.percentage = 0;
  }

  serialize(): BudgetSplitterItemData {
    return {
      id: this.id,
      money: this.money,
      time: this.time,
      percentage: this.percentage,
    };
  }

  static deserialize(serialized: BudgetSplitterItemData): BudgetSplitterItem {
    const item = new BudgetSplitterItem(serialized.id);
    item.money = serialized.money;
    item.time = serialized.time;
    item.percentage = serialized.percentage;
    return item;
  }

  updateTotals(totals: BudgetSplitterTotals): void {
    const fraction = this.percentage / 100;
    this.money = Math.round(fraction * totals.money);
    this.time = Math.round(fraction * totals.time);
  }

  updateByMoney(money: number, totals: BudgetSplitterTotals): [number, number] {
    const oldPerc = this.percentage;
    const newPerc = Math.round(100 * (money / totals.money));
    const newFraction = newPerc / 100;

    this.money = money;
    this.percentage = newPerc;
    this.time = totals.time * newFraction;

    return [oldPerc, newPerc];
  }

  updateByTime(time: number, totals: BudgetSplitterTotals): [number, number] {
    const oldPerc = this.percentage;
    const newPerc = Math.round(100 * (time / totals.time));
    const newFraction = newPerc / 100;

    this.time = time;
    this.percentage = newPerc;
    this.money = totals.money * newFraction;

    return [oldPerc, newPerc];
  }

  updateByPercentage(
    percentage: number,
    totals: BudgetSplitterTotals,
  ): [number, number] {
    const oldPerc = this.percentage;
    this.percentage = percentage;
    const fraction = percentage / 100;
    this.money = Math.round(totals.money * fraction);
    this.time = Math.round(totals.time * fraction);

    return [oldPerc, percentage];
  }

  redistribute(percentageChange: number, totals: BudgetSplitterTotals): void {
    this.percentage = Math.round(this.percentage * percentageChange);
    const newFraction = this.percentage / 100;
    this.money = Math.round(totals.money * newFraction);
    this.time = Math.round(totals.time * newFraction);
  }

  setToZero(): void {
    this.money = 0;
    this.time = 0;
    this.percentage = 0;
  }

  toString(): string {
    const values = [
      `id=${this.id}`,
      `money=${this.money}`,
      `time=${this.time}`,
      `percentage=${this.percentage}`,
    ];

    return `BudgetSplitterItem{${values.join(', ')}}`;
  }
}
