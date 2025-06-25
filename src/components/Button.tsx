// components/Button.tsx
import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, Dimensions, TextStyle, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../context/ThemeContext'; // Adjust the import path as necessary
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
    title: string;
    onPress?: (e: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, disabled = false, loading = false }) => {
    const theme = useContext(ThemeContext); // <- Access theme globally
    console.log(disabled)
    const handlePress = (e: GestureResponderEvent) => {
        if (!disabled && !loading && onPress) {
            onPress(e);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled || loading}
            style={[
                styles.button,
                { borderRadius: theme.borderRadius, padding: theme.spacing.md, opacity: disabled || loading ? 0.6 : 1 },
                style,
            ]}
        >
            <LinearGradient
                colors={[theme.colors.buttonPrimary, theme.colors.buttonSecondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: theme.borderRadius }]}
            />
            {loading ? (
                <ActivityIndicator color={theme.colors.buttonText} />
            ) : (
                <Text style={[
                    styles.title,
                    { color: disabled ? theme.colors.buttonText + '80' : theme.colors.buttonText, fontFamily: theme.typography.fontFamilyBold },
                    textStyle
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.05,
        borderRadius: width * 0.03,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 16,
    },
});

export default Button;
