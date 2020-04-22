export default {
  create(name: string, value: string) {
    document.cookie = `${name}=${value}`;
  },
  get(name: string) {
    if (RegExp(name + "=w*;?").test(document.cookie)) {
      return document.cookie.replace(RegExp(name + "=(\\w*);?"), "$1");
    } else {
      return "";
    }
  },
  delete(name: string) {
    document.cookie = `${name}=;expires=${new Date().toUTCString()}`;
  },
};
