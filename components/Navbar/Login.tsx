'use client';

import { useState, useEffect } from 'react';
import { signIn, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index'
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    setAuthProviders();
  }, []);
  return (
    <div className='flex items-center'>
      { providers &&
        Object.values(providers).map((provider) => (
          <button
            key={ provider.name }
            onClick={ () => signIn(provider.id) }
            className='flex items-center text-white bg-cyan-500 hover:bg-cyan-600 hover:text-white rounded-md px-3 py-2'
          >
            <FaGoogle className='text-white mr-2' />
            <span>Login or Register</span>
          </button>
        )) }
    </div>
  )
}

export default Login