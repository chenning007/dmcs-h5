export function cookieToJson() {
    let cookieArr = document.cookie.split("; ");//这里有个空格
    var cookieObj = cookieArr.reduce((pre, next) => {
      const key = next.split('=')[0];
      const val = next.split('=')[1];
      pre[key] = val;
      return pre;  
  }, {});
  
    return cookieObj;
}