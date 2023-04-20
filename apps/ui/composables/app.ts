const navDrawer = ref<boolean>()
const settingsDrawer = ref<boolean>()
export function useAppState() {
  return {
    navDrawer,
    settingsDrawer
  }
}
