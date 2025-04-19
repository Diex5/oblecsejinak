import { useLocalStorage } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'

const names = [
  'Jana', 'Petr', 'Marie', 'Tomáš', 'Eva', 'Martin', 'Lucie',
  'David', 'Anna', 'Filip', 'Tereza', 'Ondřej', 'Veronika', 'Návstěvník', 'Návstěvník',
]
const namesWithnoutGuest = [
  'Jana', 'Petr', 'Marie', 'Tomáš', 'Eva', 'Martin', 'Lucie',
  'David', 'Anna', 'Filip', 'Tereza', 'Ondřej', 'Veronika',
]

const timeVariants = [
  'před chvílí', 'před 2 minutami', 'před 5 minutami',
  'před minutou',
]

export const useNotificationSystem = (maxNotifications = 3) => {
  const toast = useToast()
  const usedNames = useLocalStorage('usedNames', [])
  let notificationCount = 0

  const getRandomDelay = (index: number) => {
    if (index === 0) return 20000
    return Math.floor(Math.random() * (80000 - 25000) + 25000)
  }
  const showNotification = () => {
    const availableNames = names.filter(name => !usedNames.value.includes(name))
    if (!availableNames.length) return

    const randomName = availableNames[Math.floor(Math.random() * availableNames.length)]
    const randomTime = timeVariants[Math.floor(Math.random() * timeVariants.length)]

    usedNames.value = [...usedNames.value, randomName]

    toast.add({
      summary: `${randomTime === 'undefined' ? 'před chvílí' : randomTime}`,
      detail: `${randomName}`,
      life: 6000,
      severity: 'success',
      group: 'headless',
    })
  }

  const startNotifications = () => {
    const scheduleNext = () => {
      if (notificationCount >= maxNotifications) return

      setTimeout(() => {
        showNotification()
        notificationCount++
        scheduleNext()
      }, getRandomDelay(notificationCount))
    }

    scheduleNext()
  }

  const resetSession = () => {
    usedNames.value = []
    notificationCount = 0
    toast.add({
      severity: 'success',
      summary: 'Reset',
      detail: 'Notifikace byly resetovány',
      life: 2000,
    })
  }
  const showRandomAlert = () => {
    const randomName = namesWithnoutGuest[Math.floor(Math.random() * namesWithnoutGuest.length)]
    toast.add({
      summary: 'Před minutou',
      detail: `${randomName}`,
      life: 6000,
      severity: 'info',
      group: 'headless',
    })
  }

  return { startNotifications, showRandomAlert, resetSession }
}
