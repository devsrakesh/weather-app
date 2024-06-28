// src/composables/useAuth.ts

import { ref } from 'vue'
import { auth } from '@/utils/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const user = ref(auth.currentUser)
const error = ref<string | null>(null)

auth.onAuthStateChanged((u) => {
  user.value = u
})

const signUp = async (email: string, password: string) => {
  error.value = null
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (err) {
    error.value = (err as Error).message
  }
}

const signIn = async (email: string, password: string) => {
  error.value = null
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    error.value = (err as Error).message
  }
}

const signOutUser = async () => {
  error.value = null
  try {
    await signOut(auth)
  } catch (err) {
    error.value = (err as Error).message
  }
}

export function useAuth() {
  return { user, error, signUp, signIn, signOutUser }
}
