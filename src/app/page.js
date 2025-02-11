import Image from 'next/image'
import UsersComponents from './users/[id]/users.components'

export default function Home () {
  return (
    <div>
      <title>ReqRes</title>
      <UsersComponents />
    </div>
  )
}
