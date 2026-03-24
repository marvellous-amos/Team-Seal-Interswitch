'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Root redirect — send to login page
export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/login')
  }, [router])
  return null
}
