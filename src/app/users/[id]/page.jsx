'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import NavbarComponents from '@/components/navbar/navberComponents'

const baseUrl = 'https://reqres.in/'

export default function SingleUsersComponents () {
  const { id } = useParams()
  
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    axios
      .get(`${baseUrl}api/users/${id}`)
      .then(res => {
        console.log(res.data.data)
        setUser(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return (
    <>
      <NavbarComponents />
      <div className='row h-screen flex justify-center items-center bg-gray-100'>
        {isLoading ? (
          <div className='w-full text-center h-full'>Loading...</div>
        ) : user ? (
          <div
            key={user.id}
            className='w-1/3 h-1/2 bg-white rounded-lg flex gap-10 items-center justify-center shadow-lg shadow-white'
          >
            <img
              className='rounded-3xl'
              width={200}
              src={user.avatar}
              alt={user.first_name}
            />
            <div>
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
              <a
                className='text-blue-500 underline'
                href={`mailto:${user.email}`}
              >
                {user.email}
              </a>
            </div>
          </div>
        ) : (
          <div className='text-center'>Foydalanuvchi topilmadi</div>
        )}
      </div>
    </>
  )
}
