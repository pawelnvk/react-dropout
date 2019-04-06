export const extendProps = initialProps => externalProps => ({
  ...externalProps,
  ...initialProps,
});

export const getItemsIdsByGrades = (items = []) =>
  Object.entries(items)
    .sort(
      (
        [indexA, { grade: gradeA = Number(indexA) + items.length }],
        [indexB, { grade: gradeB = Number(indexB) + items.length }],
      ) => gradeA - gradeB,
    )
    .map(([id]) => Number(id));

export const hasIndex = ids => (value, index) => ids.indexOf(index) !== -1;

export const getItemsData = (items = [], countToHide = 0) => {
  const rangeIndex = items.length - countToHide;
  const idsByGrades = getItemsIdsByGrades(items);
  const ids = idsByGrades.slice(0, rangeIndex);
  const exceedingIds = idsByGrades.slice(rangeIndex);

  return {
    countToHide,
    exceedingItems: items.filter(hasIndex(exceedingIds)),
    items: items.filter(hasIndex(ids)),
  };
};
