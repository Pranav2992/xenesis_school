import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from '../theme';
const { width, height } = Dimensions.get('window');

// Responsive helper functions
const scale = (size: number) => (width / 375) * size; // Base width of 375 (iPhone X)
const verticalScale = (size: number) => (height / 812) * size; // Base height of 812
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(16),
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.2,
        shadowRadius: scale(4),
        elevation: 4,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#222',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(20),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#222',
        lineHeight: moderateScale(28),
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: '#666',
        lineHeight: moderateScale(20),
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.textInputContainerBackground,
        borderRadius: scale(8),
        borderColor: theme.colors.textInputBorder,
        borderWidth: 1,
        paddingHorizontal: scale(12),
        marginBottom: verticalScale(16),
        minHeight: verticalScale(48),
        paddingVertical: verticalScale(8),
    },
    inputIonicons: {
        marginHorizontal: scale(4),
        marginVertical: verticalScale(4),
    },
    input: {
        flex: 1,
        color: theme.colors.textInputText,
        fontFamily: theme.typography.fontFamilyRegular,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(20),
        paddingVertical: verticalScale(4),
        minHeight: verticalScale(20),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(24),
        flexWrap: 'wrap',
    },
});

export default globalStyles;
