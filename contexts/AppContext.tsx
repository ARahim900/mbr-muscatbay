import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { ViewKey } from '../types';

// Application State Interface
interface AppState {
  activeView: ViewKey;
  isSidebarOpen: boolean;
  isMobile: boolean;
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

// Notification Interface
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  autoHide?: boolean;
  duration?: number;
}

// Action Types
type AppAction =
  | { type: 'SET_ACTIVE_VIEW'; payload: ViewKey }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'SET_MOBILE'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'RESET_STATE' };

// Initial State
const initialState: AppState = {
  activeView: 'water',
  isSidebarOpen: false,
  isMobile: false,
  isLoading: false,
  error: null,
  theme: 'light',
  notifications: []
};

// Reducer Function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        activeView: action.payload,
        error: null // Clear any errors when changing views
      };
    
    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        isSidebarOpen: action.payload
      };
    
    case 'SET_MOBILE':
      return {
        ...state,
        isMobile: action.payload,
        // Auto-close sidebar on mobile
        isSidebarOpen: action.payload ? false : state.isSidebarOpen
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      };
    
    case 'ADD_NOTIFICATION':
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date()
      };
      return {
        ...state,
        notifications: [...state.notifications, notification]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Context Interface
interface AppContextType {
  state: AppState;
  actions: {
    setActiveView: (view: ViewKey) => void;
    setSidebarOpen: (open: boolean) => void;
    setMobile: (mobile: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
    toggleSidebar: () => void;
    resetState: () => void;
  };
}

// Create Context
const AppContext = createContext<AppContextType | null>(null);

// Context Provider Component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    setActiveView: useCallback((view: ViewKey) => {
      dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
    }, []),

    setSidebarOpen: useCallback((open: boolean) => {
      dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open });
    }, []),

    setMobile: useCallback((mobile: boolean) => {
      dispatch({ type: 'SET_MOBILE', payload: mobile });
    }, []),

    setLoading: useCallback((loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }, []),

    setError: useCallback((error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    }, []),

    setTheme: useCallback((theme: 'light' | 'dark') => {
      dispatch({ type: 'SET_THEME', payload: theme });
      // Persist theme preference
      localStorage.setItem('app-theme', theme);
    }, []),

    addNotification: useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    }, []),

    removeNotification: useCallback((id: string) => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, []),

    clearNotifications: useCallback(() => {
      dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    }, []),

    toggleSidebar: useCallback(() => {
      dispatch({ type: 'TOGGLE_SIDEBAR' });
    }, []),

    resetState: useCallback(() => {
      dispatch({ type: 'RESET_STATE' });
    }, [])
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      actions.setMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [actions]);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      actions.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      actions.setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [actions]);

  // Auto-remove notifications with duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    state.notifications.forEach(notification => {
      if (notification.autoHide !== false && notification.duration) {
        const timer = setTimeout(() => {
          actions.removeNotification(notification.id);
        }, notification.duration);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [state.notifications, actions]);

  const contextValue: AppContextType = {
    state,
    actions
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to use App Context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Custom Hooks for specific state slices
export const useAppState = () => {
  const { state } = useApp();
  return state;
};

export const useAppActions = () => {
  const { actions } = useApp();
  return actions;
};

export const useActiveView = () => {
  const { state, actions } = useApp();
  return {
    activeView: state.activeView,
    setActiveView: actions.setActiveView
  };
};

export const useSidebar = () => {
  const { state, actions } = useApp();
  return {
    isSidebarOpen: state.isSidebarOpen,
    isMobile: state.isMobile,
    setSidebarOpen: actions.setSidebarOpen,
    toggleSidebar: actions.toggleSidebar
  };
};

export const useNotifications = () => {
  const { state, actions } = useApp();
  return {
    notifications: state.notifications,
    addNotification: actions.addNotification,
    removeNotification: actions.removeNotification,
    clearNotifications: actions.clearNotifications
  };
};

export const useTheme = () => {
  const { state, actions } = useApp();
  return {
    theme: state.theme,
    setTheme: actions.setTheme
  };
};