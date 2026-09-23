export function getDeviceId(): string {
  if (typeof window === 'undefined') return ''

  let id = localStorage.getItem('device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('device_id', id)
  }
  return id
}

export function getDeviceLabel(): string {
  if (typeof window === 'undefined') return 'Unknown device'
  const ua = navigator.userAgent
  if (/Mobi|Android/i.test(ua)) return 'Mobile device'
  if (/Mac/i.test(ua)) return 'Mac'
  if (/Win/i.test(ua)) return 'Windows PC'
  return 'Unknown device'
}