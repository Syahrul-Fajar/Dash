import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

export function SettingsFeedback() {
  const { settings } = useTheme();
  const location = useLocation();
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastChange, setLastChange] = useState("");
  const previousSettings = useRef(settings);
  const isInitialLoad = useRef(true);

  // Track actual setting changes, not just navigation
  useEffect(() => {
    // Skip initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      previousSettings.current = settings;
      return;
    }

    // Only show feedback if we're on the settings page
    if (location.pathname !== "/settings") {
      return;
    }

    // Check for actual changes in settings
    const changes = [];
    const prev = previousSettings.current;

    if (prev.sidebarCompact !== settings.sidebarCompact) {
      changes.push(
        `Sidebar Compact ${settings.sidebarCompact ? "diaktifkan" : "dinonaktifkan"}`,
      );
    }
    if (prev.stickyHeader !== settings.stickyHeader) {
      changes.push(
        `Sticky Header ${settings.stickyHeader ? "diaktifkan" : "dinonaktifkan"}`,
      );
    }
    if (prev.denseTables !== settings.denseTables) {
      changes.push(
        `Dense Tables ${settings.denseTables ? "diaktifkan" : "dinonaktifkan"}`,
      );
    }
    if (prev.autoHideSidebar !== settings.autoHideSidebar) {
      changes.push(
        `Auto-hide Sidebar ${settings.autoHideSidebar ? "diaktifkan" : "dinonaktifkan"}`,
      );
    }
    if (prev.mode !== settings.mode) {
      changes.push(`Mode diubah ke ${settings.mode}`);
    }
    if (prev.accentColor !== settings.accentColor) {
      changes.push(`Warna aksen diubah ke ${settings.accentColor}`);
    }
    if (prev.fontSize !== settings.fontSize) {
      changes.push(`Ukuran font diubah ke ${settings.fontSize}`);
    }
    if (prev.borderRadius !== settings.borderRadius) {
      changes.push(`Border radius diubah ke ${settings.borderRadius}`);
    }
    if (prev.animationSpeed !== settings.animationSpeed) {
      changes.push(`Kecepatan animasi diubah ke ${settings.animationSpeed}`);
    }
    if (prev.sidebarStyle !== settings.sidebarStyle) {
      changes.push(`Gaya sidebar diubah ke ${settings.sidebarStyle}`);
    }

    // Only show feedback if there were actual changes
    if (changes.length > 0) {
      setLastChange(changes[0]); // Show the first change
      setShowFeedback(true);
      const timer = setTimeout(() => setShowFeedback(false), 2000);

      // Update previous settings
      previousSettings.current = settings;

      return () => clearTimeout(timer);
    }
  }, [settings, location.pathname]);

  if (!showFeedback) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in-0">
      <Card
        className="w-80 shadow-lg border-l-4"
        style={{ borderLeftColor: "var(--primary-color)" }}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="p-1 rounded-full"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-sm">Pengaturan Diterapkan</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {lastChange}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Check className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600">Auto-saved</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
