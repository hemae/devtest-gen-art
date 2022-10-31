export type Screen = 'mobile' | 'tablet' | 'desktop'

export const screenBreakPoints = {
    mobile: [0, 800],
    tablet: [800, 1170],
    desktop: [1170, Number.MAX_SAFE_INTEGER]
} as Record<Screen, [number, number]>

export const maxSectionWidth = 1440
