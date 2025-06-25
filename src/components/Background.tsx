import React, { ReactNode } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

interface BackgroundProps {
    children: ReactNode;
    colors?: string[];
    locations?: number[];
}

const SoftPinkRadialBackground: React.FC<BackgroundProps> = ({
    children,
    colors = ['#F8BFC2', '#FDEDED', '#F8BFC2'],
    locations = [0, 0.5, 1]
}) => {
    return (
        <>
            <LinearGradient
                colors={colors}
                locations={locations}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
});

export default SoftPinkRadialBackground;
