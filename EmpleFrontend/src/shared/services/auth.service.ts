import { apiRequest } from '@/shared/utils/api'
import { CurrentUser } from '@/shared/types/auth.types'

type MeResponse = {
  success?: boolean
  message?: string
  user: CurrentUser
}

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const data = await apiRequest<MeResponse>('/api/v1/users/me')
  return data.user
}