import { create } from 'zustand'

type NavigationStore = {
  path: string
  navigate: (newPath: string) => void
}

const useNavigation = create<NavigationStore>((set) => ({
  path: '/',
  navigate: (newPath: string) => {
    set({ path: newPath })
  }
}))

export default useNavigation
