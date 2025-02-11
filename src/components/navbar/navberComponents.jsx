import Link from 'next/link'

export default function NavbarComponents () {
  return (
    <nav className='w-full bg-gray-300 py-2 shadow-lg  flex justify-center'>

      <Link href='/'>
        <img className='h-10' src='https://reqres.in/img/logo.png' alt='' />

      </Link>
    </nav>
  )
}
