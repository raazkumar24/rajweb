/**
 * =============================================================================
 * CENTRALIZED THEME CONFIGURATION
 * =============================================================================
 * 
 * Website ke theme colors ko manage karne ke liye ye central configuration hai.
 * 
 * 1. CSS VARIABLES: 'src/index.css' me :root ke andar CSS variables set hain.
 *    Wahan koi bhi hex code change karne par poori website ka color turant badal jayega!
 * 
 * 2. PRESET PALETTES: Neeche alag-alag color themes diye gaye hain.
 *    Aap inme se koi bhi palette 'src/index.css' me copy-paste kar sakte hain
 *    ya 'node scripts/switch-theme.mjs <theme-name>' chala sakte hain!
 * =============================================================================
 */

export const THEME_PALETTES = {
  // Current Active Theme: Electric Purple / Violet
  purple: {
    name: "Electric Purple / Violet",
    primary: "#8B5CF6",
    primaryDark: "#7C3AED",
    primaryLight: "#A78BFA",
    primaryDeep: "#6D28D9",
    stop0: "#C4B5FD",
    stop1: "#A78BFA",
    stop2: "#8B5CF6",
    stop3: "#6D28D9",
    rgb: "139, 92, 246",
    rgbDark: "124, 58, 237",
    shimmerBg: "#F5F3FF",
  },

  // Royal Blue / Indigo (Tech & Professional)
  blue: {
    name: "Royal Blue / Indigo",
    primary: "#3B82F6",
    primaryDark: "#2563EB",
    primaryLight: "#60A5FA",
    primaryDeep: "#1D4ED8",
    stop0: "#93C5FD",
    stop1: "#60A5FA",
    stop2: "#3B82F6",
    stop3: "#1D4ED8",
    rgb: "59, 130, 246",
    rgbDark: "37, 99, 235",
    shimmerBg: "#F0F7FF",
  },

  // Cyber Emerald / Mint (Fresh & Fintech)
  emerald: {
    name: "Cyber Emerald / Mint",
    primary: "#10B981",
    primaryDark: "#059669",
    primaryLight: "#34D399",
    primaryDeep: "#047857",
    stop0: "#6EE7B7",
    stop1: "#34D399",
    stop2: "#10B981",
    stop3: "#047857",
    rgb: "16, 185, 129",
    rgbDark: "5, 150, 105",
    shimmerBg: "#ECFDF5",
  },

  // Crimson Red / Coral (Bold & High-Energy)
  crimson: {
    name: "Crimson Red / Coral",
    primary: "#EF4444",
    primaryDark: "#DC2626",
    primaryLight: "#F87171",
    primaryDeep: "#B91C1C",
    stop0: "#FCA5A5",
    stop1: "#F87171",
    stop2: "#EF4444",
    stop3: "#B91C1C",
    rgb: "239, 68, 68",
    rgbDark: "220, 38, 38",
    shimmerBg: "#FEF2F2",
  },

  // Neon Rose / Pink (Trendy & Creative)
  pink: {
    name: "Neon Rose / Pink",
    primary: "#EC4899",
    primaryDark: "#DB2777",
    primaryLight: "#F472B6",
    primaryDeep: "#BE185D",
    stop0: "#F9A8D4",
    stop1: "#F472B6",
    stop2: "#EC4899",
    stop3: "#BE185D",
    rgb: "236, 72, 153",
    rgbDark: "219, 39, 119",
    shimmerBg: "#FDF2F8",
  },

  // Sunset Orange (Original)
  orange: {
    name: "Sunset Orange",
    primary: "#FF8A00",
    primaryDark: "#FF7700",
    primaryLight: "#FF9500",
    primaryDeep: "#FF6A00",
    stop0: "#FFC85A",
    stop1: "#FF9A1F",
    stop2: "#FF6A00",
    stop3: "#E94A00",
    rgb: "255, 138, 0",
    rgbDark: "255, 119, 0",
    shimmerBg: "#FFF7EC",
  },
};

export const CURRENT_THEME = THEME_PALETTES.purple;
