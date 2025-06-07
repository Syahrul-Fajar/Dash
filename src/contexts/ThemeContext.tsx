import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface ThemeSettings {
  // Theme Mode
  mode: "light" | "dark" | "auto";

  // Accent Color
  accentColor: "red-orange" | "blue" | "green" | "purple" | "pink";

  // Font Size
  fontSize: "small" | "medium" | "large";

  // Layout Preferences
  sidebarCompact: boolean;
  stickyHeader: boolean;
  autoHideSidebar: boolean;
  denseTables: boolean;
  itemsPerPage: number;

  // Business Branding
  businessName: string;
  primaryColor: string;
  secondaryColor: string;

  // Advanced Settings
  borderRadius: "none" | "small" | "medium" | "large";
  animationSpeed: "slow" | "normal" | "fast" | "none";
  sidebarStyle: "default" | "modern" | "minimal";
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
  resetToDefault: () => void;
  isDark: boolean;
}

const defaultSettings: ThemeSettings = {
  mode: "light",
  accentColor: "red-orange",
  fontSize: "medium",
  sidebarCompact: false,
  stickyHeader: true,
  autoHideSidebar: true,
  denseTables: false,
  itemsPerPage: 20,
  businessName: "Baelangan Admin",
  primaryColor: "#ef4444", // red-500
  secondaryColor: "#f97316", // orange-500
  borderRadius: "medium",
  animationSpeed: "normal",
  sidebarStyle: "default",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("dashboard-theme-settings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const [isDark, setIsDark] = useState(false);

  // Handle theme mode changes
  useEffect(() => {
    const applyTheme = () => {
      if (settings.mode === "auto") {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
      } else {
        setIsDark(settings.mode === "dark");
      }
    };

    applyTheme();
  }, [settings.mode]);

  // Apply CSS custom properties
  useEffect(() => {
    const root = document.documentElement;

    // Apply theme colors based on accent color
    const colorMap = {
      "red-orange": {
        primary: "#ef4444",
        secondary: "#f97316",
        gradient: "linear-gradient(135deg, #ef4444, #f97316)",
      },
      blue: {
        primary: "#3b82f6",
        secondary: "#1d4ed8",
        gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      },
      green: {
        primary: "#10b981",
        secondary: "#059669",
        gradient: "linear-gradient(135deg, #10b981, #059669)",
      },
      purple: {
        primary: "#8b5cf6",
        secondary: "#7c3aed",
        gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      },
      pink: {
        primary: "#ec4899",
        secondary: "#db2777",
        gradient: "linear-gradient(135deg, #ec4899, #db2777)",
      },
    };

    const colors = colorMap[settings.accentColor];
    root.style.setProperty("--primary-color", colors.primary);
    root.style.setProperty("--secondary-color", colors.secondary);
    root.style.setProperty("--gradient-bg", colors.gradient);

    // Apply font size
    const fontSizeMap = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };
    root.style.setProperty("--base-font-size", fontSizeMap[settings.fontSize]);

    // Apply border radius
    const radiusMap = {
      none: "0px",
      small: "4px",
      medium: "8px",
      large: "12px",
    };
    root.style.setProperty("--border-radius", radiusMap[settings.borderRadius]);

    // Apply animation speed
    const speedMap = {
      none: "0ms",
      slow: "300ms",
      normal: "200ms",
      fast: "100ms",
    };
    root.style.setProperty(
      "--transition-duration",
      speedMap[settings.animationSpeed],
    );

    // Apply dark/light theme
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings, isDark]);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("dashboard-theme-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDefault = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("dashboard-theme-settings");
  };

  return (
    <ThemeContext.Provider
      value={{ settings, updateSettings, resetToDefault, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
