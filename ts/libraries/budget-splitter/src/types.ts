export type BudgetSplitterNotifier = (
  message: string,
  items: BudgetSplitterItemData[],
) => void;

export type BudgetSplitterItemData = {
  id: string;
  money: number;
  time: number;
  percentage: number;
};

export type BudgetSplitterTotals = {
  money: number;
  time: number;
};
