/**
 * 通过authCode 获取是否有权限
 * @param  {[type]} authCode [description]
 * @return {[type]}          [description]
 */

export function getAuth(authCode: string) {
  if (window.isDev) {
    return true;
  }
  if (window.user.username === 'admin') {
    return true;
  }
  if (window.viewAuth === '0') {
    return true;
  }

  let codes = window.authlist || ['admin', 'user'];
  var _b = codes.contains(authCode);
  return _b;
}

Array.prototype.contains = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === val) {
      return true;
    }
  }
  return false;
};

// Function.prototype.getName = function() {
//   return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
// };

export function getAuthFormItem(name: string, useName: string) {
  let keys = [];
  let cloumnsAuth = window.cloumnsAuth || {};
  keys = cloumnsAuth[useName] || [];
  var _b = keys.contains(name);
  return !_b;
}

//这是过滤掉表格的显示字段
export function getAuthColumn(columns: any[], authCode: string) {
  // 先看是否有全部权限，否则细化权限！
  // const isAuth = getAuth(authCode);
  // if (!isAuth) {
  // 没有全部浏览权限，进行筛选！
  let keys = [];
  let cloumnsAuth = window.cloumnsAuth || {};
  keys = cloumnsAuth[authCode] || [];
  return delColumn(columns, keys);
  // } else {
  //   return columns;
  // }
}

export function delColumn(columns: any[], keys: any[]) {
  let newColumns: any[] = [];
  columns.map(c => {
    if (keys.indexOf(c.key) == -1) {
      newColumns.push(c);
    }
  });
  return newColumns;
}
