import { dayjs } from 'element-plus'

export const formatDate = (date) => {
  return dayjs(date).format('YYYY年MM月DD日')
}
