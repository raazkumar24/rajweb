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

    // Midnight Cyan (Premium Tech & Developer Portfolio)
  cyan: {
    name: "Midnight Cyan",
    primary: "#06B6D4",
    primaryDark: "#0891B2",
    primaryLight: "#67E8F9",
    primaryDeep: "#0E7490",
    stop0: "#A5F3FC",
    stop1: "#67E8F9",
    stop2: "#06B6D4",
    stop3: "#0E7490",
    rgb: "6, 182, 212",
    rgbDark: "8, 145, 178",
    shimmerBg: "#ECFEFF",
  },

  // Acid Lime (Bold & Creative Portfolio)
  lime: {
    name: "Acid Lime",
    primary: "#84CC16",
    primaryDark: "#65A30D",
    primaryLight: "#BEF264",
    primaryDeep: "#4D7C0F",
    stop0: "#D9F99D",
    stop1: "#BEF264",
    stop2: "#84CC16",
    stop3: "#4D7C0F",
    rgb: "132, 204, 22",
    rgbDark: "101, 163, 13",
    shimmerBg: "#F7FEE7",
  },
    // Electric Indigo (Modern SaaS & Premium Portfolio)
  indigo: {
    name: "Electric Indigo",
    primary: "#6366F1",
    primaryDark: "#4F46E5",
    primaryLight: "#818CF8",
    primaryDeep: "#4338CA",
    stop0: "#C7D2FE",
    stop1: "#818CF8",
    stop2: "#6366F1",
    stop3: "#4338CA",
    rgb: "99, 102, 241",
    rgbDark: "79, 70, 229",
    shimmerBg: "#EEF2FF",
  },

  // Golden Amber (Luxury & Warm Highlight)
  amber: {
    name: "Golden Amber",
    primary: "#F59E0B",
    primaryDark: "#D97706",
    primaryLight: "#FBBF24",
    primaryDeep: "#B45309",
    stop0: "#FDE68A",
    stop1: "#FBBF24",
    stop2: "#F59E0B",
    stop3: "#B45309",
    rgb: "245, 158, 11",
    rgbDark: "217, 119, 6",
    shimmerBg: "#FFFBEB",
  },

  // Teal Aqua (Calm, Clean & Modern)
  teal: {
    name: "Teal Aqua",
    primary: "#14B8A6",
    primaryDark: "#0D9488",
    primaryLight: "#5EEAD4",
    primaryDeep: "#0F766E",
    stop0: "#99F6E4",
    stop1: "#5EEAD4",
    stop2: "#14B8A6",
    stop3: "#0F766E",
    rgb: "20, 184, 166",
    rgbDark: "13, 148, 136",
    shimmerBg: "#F0FDFA",
  },

  // Fuchsia Magenta (Bold & Creative Standout)
  fuchsia: {
    name: "Fuchsia Magenta",
    primary: "#D946EF",
    primaryDark: "#C026D3",
    primaryLight: "#E879F9",
    primaryDeep: "#A21CAF",
    stop0: "#F5D0FE",
    stop1: "#E879F9",
    stop2: "#D946EF",
    stop3: "#A21CAF",
    rgb: "217, 70, 239",
    rgbDark: "192, 38, 211",
    shimmerBg: "#FDF4FF",
  },
  
};

export const CURRENT_THEME = THEME_PALETTES.cyan;
