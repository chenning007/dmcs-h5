export function clearAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?=)/g);
  if (keys) {
    for (let i = keys.length; (i -= 1); )
      document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`;
  }
}
