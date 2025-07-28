const baseURL = 'http://127.0.0.1:8080';
const getArr = arr => arr.reduce((sum, item) => sum += item, 0)
export default {
  arr: getArr,
  url: baseURL
}