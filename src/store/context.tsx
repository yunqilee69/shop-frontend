/**
 * 全局状态 Context
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserInfo } from '@/types';
import Storage from '@/utils/storage';
import { TokenKey } from '@/constants';

interface AppState {
  user: UserInfo | null;
  token: string | null;
  loading: boolean;
  collapsed: boolean;
}

interface AppActions {
  setUser: (user: UserInfo | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
  logout: () => void;
  login: (token: string, user: UserInfo) => void;
}

interface AppContextType {
  state: AppState;
  actions: AppActions;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 从 localStorage 初始化状态
  const [user, setUserState] = useState<UserInfo | null>(() => {
    return Storage.getLocal<UserInfo>(TokenKey.USER_INFO);
  });

  const [token, setTokenState] = useState<string | null>(() => {
    return Storage.getLocal<string>(TokenKey.ACCESS_TOKEN);
  });

  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // 设置用户信息
  const setUser = useCallback((user: UserInfo | null) => {
    setUserState(user);
    if (user) {
      Storage.setLocal(TokenKey.USER_INFO, user);
    } else {
      Storage.removeLocal(TokenKey.USER_INFO);
    }
  }, []);

  // 设置 token
  const setToken = useCallback((token: string | null) => {
    setTokenState(token);
    if (token) {
      Storage.setLocal(TokenKey.ACCESS_TOKEN, token);
    } else {
      Storage.removeLocal(TokenKey.ACCESS_TOKEN);
    }
  }, []);

  // 登录
  const login = useCallback((token: string, user: UserInfo) => {
    setToken(token);
    setUser(user);
  }, [setToken, setUser]);

  // 登出
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    Storage.clearLocal();
  }, [setToken, setUser]);

  const value: AppContextType = {
    state: {
      user,
      token,
      loading,
      collapsed,
    },
    actions: {
      setUser,
      setToken,
      setLoading,
      setCollapsed,
      logout,
      login,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * 使用 App Context
 */
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
