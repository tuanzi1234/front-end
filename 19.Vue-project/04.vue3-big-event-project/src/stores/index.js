import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
// import { useUserStore } from '@/stores/modules/user.js'

const pinia = createPinia().use(persist)

export default pinia
// export { useUserStore }

// 可简写为
export * from './modules/user'
