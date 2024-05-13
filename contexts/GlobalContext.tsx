'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/message/getUnreadMessageCount';

interface ValueType {
  unreadCount: number
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const GlobalContext = createContext<ValueType>({} as ValueType)

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!session) return;

    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      })
    }

  }, [session]);

  const value: ValueType = {
    unreadCount,
    setUnreadCount,
  };

  return (
    <GlobalContext.Provider value={ value }>
      { children }
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}