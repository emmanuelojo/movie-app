export default {
  set(name: string, value: any) {
    localStorage[name] = value
  },
  get(name: string) {
    return localStorage[name]
  },
  remove(name: string) {
    localStorage.removeItem(name)
  },
  clearAll() {
    localStorage.clear()
  },
}
