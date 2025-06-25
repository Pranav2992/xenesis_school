import colors, { Colors } from './colors';
import typography, { Typography } from './typography';
import spacing, { Spacing } from './spacing';

const theme = {
    colors,
    typography,
    spacing,
    borderRadius: 12,
};

export type Theme = {
    colors: Colors;
    typography: Typography;
    spacing: Spacing;
    borderRadius: number;
};

export default theme;
