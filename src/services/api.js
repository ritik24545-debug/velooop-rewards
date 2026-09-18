const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
export const AUTH_TOKEN_KEY = 'velooop_access_token'

export function storeAuthSession(data) {
  if (data?.token) {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token)
  }
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

async function requestJson(url, options = {}) {
  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (!response.ok) {
      const error = new Error(data.message || 'Request failed')
      error.statusCode = response.status
      error.data = data
      throw error
    }

    return data
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const connectionError = new Error('Unable to reach the backend service.')
      connectionError.statusCode = 0
      throw connectionError
    }
    throw error
  }
}

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export function registerUser(userData) {
  return requestJson(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
}

export function loginUser(credentials) {
  return requestJson(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
}

export function getAuthenticatedUser(token) {
  return requestJson(`${API_BASE_URL}/api/auth/me`, {
    headers: authHeaders(token),
  })
}
