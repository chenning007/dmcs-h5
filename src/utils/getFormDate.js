// use localStorage to store the authority info, which might be sent from server in actual project.

Date.prototype.format = function Format(format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  let formats = format;
  if (/(y+)/.test(formats)) {
    formats = formats.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(formats)) {
      formats = formats.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return formats;
};

export function getSmpFormatDateByLong(data, isFull) {
  let date = new Date();
  if (data !== undefined) {
    date = new Date(data);
  }
  if (isFull === undefined || isFull === true) {
    return date.format('yyyy-MM-dd hh:mm:ss');
  } else {
    return date.format('yyyy-MM-dd');
  }
}
