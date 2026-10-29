/**
 * =============================================================================
 * CENTRALIZED COLOR PALETTES FOR "RED 01" AND "CONCRETE 02" THEMES
 * =============================================================================
 * 
 * Rules:
 *  - In 'red' mode:
 *      * Headings: Main text is Soft Black (#101010), highlight word is Crimson (#C41618).
 *  - In 'concrete' mode:
 *      * Headings: Main text is Crimson (#C41618), highlight word is Soft Black (#101010).
 *      (e.g., 'FROM CURIOSITY TO' is Red, 'CREATION' is Black; 'WHAT I WORK' is Red, 'WITH' is Black!)
 * =============================================================================
 */

export const THEME_PALETTES = {
  red: {
    id: "red",
    name: "Red 01",
    isDark: false,
    
    // About Section Background (Warm Ivory with gentle warm glow)
    bg: "linear-gradient(180deg, #F6EFE5 0%, #EFE5D5 45%, #E5DAC7 100%)",
    grainOpacity: 0.05,
    text: "#101010", // Soft Black
    textMuted: "#555555",
    border: "rgba(16, 16, 16, 0.12)",
    borderSubtle: "rgba(16, 16, 16, 0.08)",
    
    // Heading color inversion system:
    // In RED mode: Main text is Black (#101010), highlighted word is Red (#C41618)
    titleMainColor: "#101010",
    titleHighlightColor: "#C41618",
    titleHighlightClass: "underline decoration-[#C41618] decoration-4 underline-offset-8",
    
    // Key Accents
    accent: "#C41618",
    accentRed: "#C41618",
    
    // Robot mascot & stage
    robotColor: "#101010",
    robotHalo: "radial-gradient(circle, rgba(196,22,24,0.12) 0%, rgba(16,16,16,0.05) 50%, transparent 70%)",
    statusPillBg: "rgba(255, 255, 255, 0.85)",
    statusPillBorder: "rgba(196, 22, 24, 0.25)",
    statusPillText: "#101010",
    
    // Cards & elements
    cardBg: "rgba(255, 255, 255, 0.85)",
    cardBgHover: "#FFFFFF",
    cardBorder: "rgba(16, 16, 16, 0.12)",
    cardBorderHover: "rgba(196, 22, 24, 0.35)",
    cardText: "#101010",
    cardMuted: "#4B5563",
    
    // Pill chips & badges
    badgeBg: "#C41618",
    badgeText: "#FFFFFF",
    pillBg: "rgba(196, 22, 24, 0.07)",
    pillBorder: "rgba(196, 22, 24, 0.18)",
    pillText: "#C41618",
    
    // Buttons
    btnPrimaryVariant: "red",
    btnSecondaryVariant: "outlineDark",
    
    // Timeline curve
    timelineTrackBg: "rgba(16, 16, 16, 0.10)",
    timelineGrad0: "#C41618",
    timelineGrad1: "#990C0E",
    timelineGrad2: "#C41618",
    timelineDot: "#C41618",
    timelineDotBorder: "#FFFFFF",
    timelineDotHalo: "rgba(196, 22, 24, 0.65)",
    
    // Tech filter tabs
    tabContainerBg: "rgba(255, 255, 255, 0.80)",
    tabContainerBorder: "rgba(16, 16, 16, 0.12)",
    tabActiveBg: "#C41618",
    tabActiveText: "#FFFFFF",
    tabInactiveText: "#555555",
    tabCountBg: "#101010",
    tabCountText: "#FFFFFF",
  },

  concrete: {
    id: "concrete",
    name: "Concrete 02",
    isDark: false,
    
    // About Section Background (Architectural Warm Ivory #e6d5bd)
    bg: "linear-gradient(180deg, #EFE5D5 0%, #E6D5BD 45%, #DFCEB5 100%)",
    grainOpacity: 0.05,
    text: "#101010", // Soft Black
    textMuted: "#555555",
    border: "rgba(16, 16, 16, 0.14)",
    borderSubtle: "rgba(16, 16, 16, 0.08)",
    
    // Heading color inversion system:
    // In CONCRETE mode: Main text is Red (#C41618), highlighted word is Black (#101010)!
    titleMainColor: "#C41618",
    titleHighlightColor: "#101010",
    titleHighlightClass: "underline decoration-[#101010] decoration-4 underline-offset-8",
    
    // Key Accents
    accent: "#C41618",
    accentRed: "#C41618",
    
    // Robot mascot & stage
    robotColor: "#101010",
    robotHalo: "radial-gradient(circle, rgba(16,16,16,0.08) 0%, rgba(16,16,16,0.03) 50%, transparent 70%)",
    statusPillBg: "rgba(250, 246, 238, 0.90)",
    statusPillBorder: "rgba(16, 16, 16, 0.15)",
    statusPillText: "#101010",
    
    // Cards & elements
    cardBg: "rgba(250, 246, 238, 0.88)",
    cardBgHover: "#FFFFFF",
    cardBorder: "rgba(16, 16, 16, 0.14)",
    cardBorderHover: "rgba(16, 16, 16, 0.35)",
    cardText: "#101010",
    cardMuted: "#444444",
    
    // Pill chips & badges
    badgeBg: "#101010",
    badgeText: "#E6D5BD",
    pillBg: "rgba(16, 16, 16, 0.06)",
    pillBorder: "rgba(16, 16, 16, 0.14)",
    pillText: "#101010",
    
    // Buttons
    btnPrimaryVariant: "dark",
    btnSecondaryVariant: "outlineDark",
    
    // Timeline curve
    timelineTrackBg: "rgba(16, 16, 16, 0.12)",
    timelineGrad0: "#101010",
    timelineGrad1: "#C41618",
    timelineGrad2: "#101010",
    timelineDot: "#101010",
    timelineDotBorder: "#E6D5BD",
    timelineDotHalo: "rgba(16, 16, 16, 0.65)",
    
    // Tech filter tabs
    tabContainerBg: "rgba(250, 246, 238, 0.85)",
    tabContainerBorder: "rgba(16, 16, 16, 0.15)",
    tabActiveBg: "#101010",
    tabActiveText: "#E6D5BD",
    tabInactiveText: "#555555",
    tabCountBg: "#C41618",
    tabCountText: "#FFFFFF",
  },
};

export const getThemePalette = (mode) => {
  return mode === "concrete" ? THEME_PALETTES.concrete : THEME_PALETTES.red;
};
