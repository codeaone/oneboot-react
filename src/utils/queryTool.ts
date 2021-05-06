export function filterQueryData(payload: any) {
  //组件新的查询参数
  const newQuery = {
    ...payload,
  };

  //去掉为''的参数，这些参数不在会URL显示
  for (var key in newQuery) {
    if (!newQuery[key]) {
      newQuery[key] = undefined;
    } else if (newQuery[key] === 'all') {
      newQuery[key] = undefined;
    }
  }
  return newQuery;
}
