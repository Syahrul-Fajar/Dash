import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

export function SettingsFeedback() {
  const { settings } = useTheme();
  const [changes, setChanges] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // Track setting changes
  useEffect(() => {
    const newChanges = [];

    if (settings.sidebarCompact) {
      newChanges.push("Sidebar Compact diaktifkan");
    }
    if (settings.stickyHeader) {
      newChanges.push("Sticky Header diaktifkan");
    }
    if (settings.denseTables) {
      newChanges.push("Dense Tables diaktifkan");
    }
    if (settings.autoHideSidebar) {
      newChanges.push("Auto-hide Sidebar diaktifkan");
    }

    newChanges.push(`Mode: ${settings.mode}`);
    newChanges.push(`Accent Color: ${settings.accentColor}`);
    newChanges.push(`Font Size: ${settings.fontSize}`);
    newChanges.push(`Border Radius: ${settings.borderRadius}`);
    newChanges.push(`Animation Speed: ${settings.animationSpeed}`);
    newChanges.push(`Sidebar Style: ${settings.sidebarStyle}`);

    setChanges(newChanges);

    // Show feedback briefly when settings change
    setShowFeedback(true);
    const timer = setTimeout(() => setShowFeedback(false), 3000);
    return () => clearTimeout(timer);
  }, [settings]);

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
            Perubahan telah disimpan dan diterapkan secara real-time
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
