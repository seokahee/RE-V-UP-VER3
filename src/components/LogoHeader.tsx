import Link from 'next/link'
const LogoHeader = () => {
  return (
    <header
      className='
      p-2
      flex
      flex justify-center
      border-solid
      border-b-2'
    >
      <nav>
        <Link href='/'>
          <p>V-UP</p>
        </Link>
      </nav>
    </header>
  )
}

export default LogoHeader
