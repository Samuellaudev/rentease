import Image from 'next/image'
import logo from '@/assets/images/logo.png';
import Login from '@/components/Navbar/Login';

const SignInPage = () => {
  const url = 'https://images.unsplash.com/photo-1512359953714-f0c9a632ab85?q=80&w=1580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <div className=" flex w-full md:mx-auto p-6 my-20 overflow-hidden bg-white rounded-lg shadow-lg border lg:max-w-4xl">
      <div className="hidden bg-cover lg:block lg:w-full" style={ { backgroundImage: `url(${url})` } }>
      </div>
      <div className=" w-full py-8 md:px-8 lg:w-full">
        <div className="flex justify-center mx-auto">
          <Image className='h-22 w-auto' src={ logo } alt='RentEase' />
        </div>
        <p className="mt-3 mb-10 text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>
        <Login />
      </div>
    </div>
  )
}

export default SignInPage