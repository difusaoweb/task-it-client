'use server'
import { cookies } from 'next/headers'

const TOKEN_KEY = 'task-it-access-token'

export async function getToken() {
  const token = cookies().get(TOKEN_KEY)
  if (token === undefined) {
    return null
  }
  if (token.value.length === 0) {
    return null
  }
  return token.value
}

export async function setToken({
  token
}: {
  token: string
}) {
  try {
    cookies().set({
      name: TOKEN_KEY,
      value: token,
      path: '/'
    })
  } catch (err) {
    console.error(err)
  }
}

export async function deleteToken() {
  try {
    cookies().delete(TOKEN_KEY)
  } catch (err) {
    console.error(err)
  }
}