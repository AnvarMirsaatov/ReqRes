'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import NavberComponents from '@/components/navbar/navberComponents'

const baseUrl = 'https://reqres.in/'

export default function Users () {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [usersFilter, setUsersFilter] = useState({})
  const [per_page, setPer_page] = useState(4)
  const [pageContainer, setPageContainer] = useState(1)

  console.log(pageContainer)

  function getUsers () {
    const endPoint = `api/users?page=${pageContainer}&per_page=${per_page}`
    setIsLoading(true)
    axios
      .get(baseUrl + endPoint)
      .then(res => {
        setIsLoading(false)
        setUsers(res.data.data)
        console.log(res.data)

        setUsersFilter(res.data)
        // setPageContainer(res.data.total_pages)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUsers()
  }, [per_page, pageContainer])

  useEffect(() => {
    const filteredData = users.filter(users => {
      return users.first_name.toLowerCase().includes(searchKey.toLowerCase())
    })

    console.log('filter data -> ', filteredData)

    setUsersFilter(currentValues => ({ ...currentValues, data: filteredData }))
  }, [searchKey])

  return (
    <div className='scrollbar-none'>
      <NavberComponents />
      <div className='flex justify-between gap-5'>
        <form className='flex items-center flex-col mt-10 w-1/5 ml-5 gap-3'>
          <input
            onInput={value => {
              setSearchKey(value.target.value)
            }}
            className='text-blue-900  border-2 w-full p-1 rounded-lg'
            type='text'
            placeholder='Write users name'
          />
          <button className='p-1 border-2 w-full rounded-lg active:bg-gray-100'>
            Search
          </button>
          <select
            className='w-full p-1 border-2 rounded-lg'
            name=''
            id=''
            onChange={val => setPer_page(val.target.value)}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
        </form>

        <div className='grid grid-cols-3 gap-4 my-10 px-32 w-full'>
          {usersFilter?.data?.length > 0 ? (
            usersFilter?.data.map((e, i) => {
              return (
                <div key={i}>
                  <div
                    key={i}
                    className='group flex min-w-56 gap-2 items-center flex-col p-3 border-2 rounded-lg hover:shadow-lg transition ease-linear duration-500 transform'
                  >
                    <img
                      className='w-48 max-h-48 rounded-xl 
                        w-40 h-40 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                      src={e.avatar}
                      alt='e.first_name'
                    />
                    <div className='flex gap-2'>
                      <p>{e.first_name}</p>
                      <p>{e.last_name}</p>
                    </div>
                    <a
                      href='http://localhost:3000/'
                      className='text-blue-500 cursor-pointer underline'
                      key={i}
                    >
                      {e.email}
                    </a>
                    <Link href={`/users/${e.id}`} key={e.id}>
                      <button className='text-blue-500 w-full rounded-lg  active:text-blue-300'>
                        More Information
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>

      {usersFilter?.data?.length > 0 &&
        Array.from({ length: usersFilter.total_pages }).map((_, i) => (
          <button
            key={i}
            className='p-3 border-2 ml-2'
            onClick={() => {
              setPageContainer(i + 1)
            }}
          >
            {i + 1}
          </button>
        ))}
      {/* 
      <button className='p-3 border-2 ml-2' onClick={()=>{setPageContainer(1)}}>1</button>
      <button className='p-3 border-2 ml-2' onClick={()=>{setPageContainer(2)}}>2</button>
      <button className='p-3 border-2 ml-2' onClick={()=>{setPageContainer(3)}}>3</button>
      <button className='p-3 border-2 ml-2' onClick={()=>{setPageContainer(4)}}>4</button> */}
    </div>
  )
}
