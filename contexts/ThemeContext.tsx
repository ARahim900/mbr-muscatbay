import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchUserTheme, updateUserTheme, resolveTheme, setupSystemThemeListener } from '../services/themeService';
import type { Theme } from '../services/themeService';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themePreference: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, userId }) => {
  const [themePreference, setThemePreference] = useState<Theme>('system');
  const [theme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Apply theme to document body
  const applyThemeToDOM = useCallback((currentTheme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      const body = document.body;
      const html = document.documentElement;
      
      // Remove existing theme classes
      body.classList.remove('light', 'dark');
      html.classList.remove('light', 'dark');
      
      // Add new theme class
      body.classList.add(currentTheme);
      html.classList.add(currentTheme);
      
      // Set CSS custom property for theme
      html.style.setProperty('--theme', currentTheme);
      
      // Update meta theme-color for mobile browsers
      let themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (!themeColorMeta) {
        themeColorMeta = document.createElement('meta');
        themeColorMeta.setAttribute('name', 'theme-color');
        document.head.appendChild(themeColorMeta);
      }
      
      // Set appropriate theme color based on current theme
      const themeColors = {
        light: '#F7F7F9',
        dark: '#1A181F'
      };
      
      themeColorMeta.setAttribute('content', themeColors[currentTheme]);
    }
  }, []);

  // Resolve theme based on preference
  const resolveCurrentTheme = useCallback((preference: Theme): 'light' | 'dark' => {
    return resolveTheme(preference);
  }, []);

  // Update theme preference and resolved theme
  const setTheme = useCallback(async (newTheme: Theme): Promise<void> => {
    try {
      setError(null);
      
      // Update theme preference
      setThemePreference(newTheme);
      
      // Resolve actual theme
      const resolvedTheme = resolveCurrentTheme(newTheme);
      setResolvedTheme(resolvedTheme);
      
      // Apply to DOM
      applyThemeToDOM(resolvedTheme);
      
      // Update on server (context7)
      await updateUserTheme(newTheme, userId);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update theme';
      setError(errorMessage);
      console.error('Theme update error:', err);
    }
  }, [userId, resolveCurrentTheme, applyThemeToDOM]);

  // Initialize theme from context7
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch user theme preference from context7
        const themeData = await fetchUserTheme(userId);
        const preference = themeData.theme;
        
        setThemePreference(preference);
        
        // Resolve the actual theme
        const resolvedTheme = resolveCurrentTheme(preference);
        setResolvedTheme(resolvedTheme);
        
        // Apply to DOM
        applyThemeToDOM(resolvedTheme);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load theme';
        setError(errorMessage);
        console.error('Theme initialization error:', err);
        
        // Fallback to system theme
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setResolvedTheme(systemTheme);
        applyThemeToDOM(systemTheme);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, [userId, resolveCurrentTheme, applyThemeToDOM]);

  // Listen for system theme changes when preference is 'system'
  useEffect(() => {
    if (themePreference !== 'system') {
      return;
    }

    const cleanup = setupSystemThemeListener((systemTheme) => {
      setResolvedTheme(systemTheme);
      applyThemeToDOM(systemTheme);
    });

    return cleanup;
  }, [themePreference, applyThemeToDOM]);

  // Provide loading state while theme is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const contextValue: ThemeContextType = {
    theme,
    themePreference,
    setTheme,
    isLoading,
    error
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Additional utility hooks
export const useThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  return toggleTheme;
};

export const useSystemTheme = () => {
  const { setTheme } = useTheme();
  
  const setSystemTheme = useCallback(() => {
    setTheme('system');
  }, [setTheme]);

  return setSystemTheme;
};