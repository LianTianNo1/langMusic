export function formatDate(now) {
  const year = now.getFullYear(); // 取得4位数的年份
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 取得日期中的月份，其中0表示1月，11表示12月
  const date = now.getDate().toString().padStart(2, "0"); // 返回日期月份中的天数（1到31）
  return year + "-" + month + "-" + date;
}

export function formatDateFully(now) {
  const year = now.getFullYear(); // 取得4位数的年份
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 取得日期中的月份，其中0表示1月，11表示12月
  const date = now.getDate().toString().padStart(2, "0"); // 返回日期月份中的天数（1到31）
  const hour = now.getHours().toString().padStart(2, "0"); // 返回日期中的小时数（0到23）
  const minute = now.getMinutes().toString().padStart(2, "0"); // 返回日期中的分钟数（0到59）
  const second = now.getSeconds().toString().padStart(2, "0"); // 返回日期中的秒数（0到59）
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  );
}
