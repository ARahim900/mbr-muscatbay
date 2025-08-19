/**
 * Theme Service - Simulates fetching theme preferences from context7 server
 * This service provides theme management capabilities for the application
 */

export type Theme = 'light' | 'dark' | 'system';

export interface ThemePreference {
  theme: Theme;
  lastUpdated: string;
  userId?: string;
}

export interface ThemeServiceConfig {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

class ThemeService {
  private config: ThemeServiceConfig;
  private cache: Map<string, ThemePreference> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes

  constructor(config: ThemeServiceConfig = {}) {
    this.config = {
      apiUrl: config.apiUrl || 'https://mcp.context7.com',
      timeout: config.timeout || 5000,
      retries: config.retries || 3,
      ...config
    };
  }

  /**
   * Fetches user theme preference from context7 server
   * Currently returns hardcoded 'dark' value as specified
   * In production, this would make actual API calls to context7
   */
  async fetchUserTheme(userId?: string): Promise<ThemePreference> {
    const cacheKey = userId || 'default';
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && this.isCacheValid(cached.lastUpdated)) {
      return cached;
    }

    try {
      // Simulate API delay
      await this.delay(100);

      // For now, return hardcoded 'dark' theme as requested
      // In production, this would be:
      // const response = await this.makeApiCall(userId);
      const themePreference: ThemePreference = {
        theme: 'dark', // Hardcoded as requested
        lastUpdated: new Date().toISOString(),
        userId
      };

      // Cache the result
      this.cache.set(cacheKey, themePreference);
      
      return themePreference;
    } catch (error) {
      console.error('Failed to fetch theme from context7:', error);
      
      // Fallback to system preference detection
      return this.getSystemThemePreference(userId);
    }
  }

  /**
   * Updates user theme preference on context7 server
   * Simulates the API call for now
   */
  async updateUserTheme(theme: Theme, userId?: string): Promise<boolean> {
    try {
      // Simulate API delay
      await this.delay(200);

      const themePreference: ThemePreference = {
        theme,
        lastUpdated: new Date().toISOString(),
        userId
      };

      // Update cache
      const cacheKey = userId || 'default';
      this.cache.set(cacheKey, themePreference);

      // In production, this would make actual API call to context7
      // const success = await this.makeApiCall(themePreference);
      
      return true; // Simulate successful update
    } catch (error) {
      console.error('Failed to update theme on context7:', error);
      return false;
    }
  }

  /**
   * Gets system theme preference as fallback
   */
  private getSystemThemePreference(userId?: string): ThemePreference {
    const prefersDark = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : false;
    
    return {
      theme: prefersDark ? 'dark' : 'light',
      lastUpdated: new Date().toISOString(),
      userId
    };
  }

  /**
   * Simulates API call delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Checks if cached data is still valid
   */
  private isCacheValid(lastUpdated: string): boolean {
    const now = new Date().getTime();
    const updated = new Date(lastUpdated).getTime();
    return (now - updated) < this.cacheExpiry;
  }

  /**
   * Clears the theme cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Resolves theme based on user preference and system settings
   */
  resolveTheme(themePreference: Theme): 'light' | 'dark' {
    if (themePreference === 'system') {
      return typeof window !== 'undefined' 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : 'light';
    }
    return themePreference;
  }

  /**
   * Sets up system theme change listener
   */
  setupSystemThemeListener(callback: (theme: 'light' | 'dark') => void): () => void {
    if (typeof window === 'undefined') {
      return () => {}; // No-op for SSR
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e: MediaQueryListEvent) => {
      callback(e.matches ? 'dark' : 'light');
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    
    // Legacy browsers
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }
}

// Export singleton instance
export const themeService = new ThemeService();

// Export individual functions for convenience
export const fetchUserTheme = (userId?: string) => themeService.fetchUserTheme(userId);
export const updateUserTheme = (theme: Theme, userId?: string) => themeService.updateUserTheme(theme, userId);
export const resolveTheme = (themePreference: Theme) => themeService.resolveTheme(themePreference);
export const setupSystemThemeListener = (callback: (theme: 'light' | 'dark') => void) => themeService.setupSystemThemeListener(callback);