const typography = {
    fontFamilyRegular: "Inter-Regular",
    fontFamilyBold: "Inter-Bold",
    fontFamilyLight: "Inter-Light",
    fontFamilyMedium: "Inter-Medium",
    fontFamilySemiBold: "Inter-SemiBold",
    fontFamilyBlack: "Inter-Black",
    fontFamilyMono: "Inter-Mono",
    fontFamilyMonoBold: "Inter-Mono-Bold",
    fontFamilyMonoItalic: "Inter-Mono-Italic",
    fontFamilyItalic: "Inter-Italic",
    fontFamilyBoldItalic: "Inter-BoldItalic",
    h1: 24,
    h2: 20,
    body: 16,
    small: 12,
} as const;

export type Typography = typeof typography;
export default typography;
