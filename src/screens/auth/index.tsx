import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StatusBar,
    Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { RootState } from '../../store';
import { fetchDatabaseList, loginUser } from '../../slices/thunks';
import { useTheme } from '../../hooks/useTheme';
import globalStyles from '../../theme/gobalstyles';
import theme from '../../theme';
import Button from '../../components/Button';
import User from '../../assets/images/user.svg';
import Password from '../../assets/images/password.svg';
import School from '../../assets/images/school.svg';
import Swiper from 'react-native-swiper';
import { Checkbox } from 'react-native-paper';
import { saveSchoolName } from '../../storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import SoftPinkRadialBackground from '../../components/Background';

const sliderImages = [
    { source: require('../../assets/images/main_img.png') },
    { source: require('../../assets/images/main_img.png') },
    { source: require('../../assets/images/main_img.png') },
];

const { width, height } = Dimensions.get('window');

// Responsive helper functions
const scale = (size: number) => (width / 375) * size; // Base width of 375 (iPhone X)
const verticalScale = (size: number) => (height / 812) * size; // Base height of 812
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const Dot = () => (
    <View style={styles.customDot} />
);

const ActiveDot = () => (
    <View style={styles.customActiveDot} >
        <View style={styles.innerActiveDot} />
    </View>
);

type LoginScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Auth'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [schoolName, setSchoolName] = useState<string>('');
    const [dbListFetched, setDbListFetched] = useState<boolean>(false);
    const [rememberMeChecked, setRememberMeChecked] = useState<'checked' | 'unchecked'>('unchecked');
    const [error, setError] = useState<string | null>(null);
    const { list, loading, loginLoading } = useSelector((state: RootState) => state.root.auth);

    // Fetch database list when schoolName changes
    useEffect(() => {
        if (schoolName.trim().length > 0) {
            setDbListFetched(false);
            dispatch(fetchDatabaseList({
                "jsonrpc": 2.0,
                "params": {}
            }))
                .unwrap()
                .then(() => {
                    console.log('then')
                    setDbListFetched(true)
                })
                .catch(() => {
                    console.log('catch')
                    setDbListFetched(false)
                });
        } else {
            setDbListFetched(false);
        }
    }, [schoolName, dispatch]);

    // Handle login
    const handleLogin = async () => {
        setError(null);
        try {
            const response = await dispatch(loginUser({
                "jsonrpc": "2.0",
                "params": {
                    "db": list[0],
                    "login": username,
                    "password": password
                }
            })).unwrap();
            if (response?.result?.uid) {  // Check if we got a valid user response
                navigation.navigate('Dashboard');
            } else {
                setError('Invalid login response');
            }
        } catch (err: any) {
            setError(err?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <SoftPinkRadialBackground
                colors={[theme.colors.darkBackgroundGradientColorShade1,
                theme.colors.darkBackgroundGradientColorShade2,
                theme.colors.darkBackgroundGradientColorShade3]}
                locations={[0, 0.5, 1]}
            >
                <ScrollView style={styles.container} bounces={false} keyboardShouldPersistTaps="handled">
                    <View style={styles.sliderWrapper}>
                        <Swiper
                            autoplay
                            showsPagination
                            dot={<Dot />}
                            activeDot={<ActiveDot />}
                            containerStyle={styles.swiperContainer}
                            paginationStyle={styles.paginationStyle}
                        >
                            {sliderImages.map((img, idx) => (
                                <Image
                                    key={idx}
                                    source={img.source}
                                    style={styles.headerImage}
                                    resizeMode="contain"
                                />
                            ))}
                        </Swiper>
                    </View>
                    {/* Login box */}
                    <View style={styles.formContainer}>
                        <Image source={require('../../assets/images/app_logo.png')} style={styles.logo} />

                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.subtitle}>Enter below details to log in</Text>

                        {/* Username */}
                        <View style={globalStyles.inputRow}>
                            <User width={moderateScale(16)} height={moderateScale(16)} style={globalStyles.inputIonicons} />
                            <TextInput
                                value={username}
                                placeholder="Enter Username"
                                style={globalStyles.input}
                                onChangeText={(text) => setUsername(text)}
                                placeholderTextColor={theme.colors.placeHolerText}
                            />
                        </View>

                        {/* Password */}
                        <View style={globalStyles.inputRow}>
                            <Password width={moderateScale(16)} height={moderateScale(16)} style={globalStyles.inputIonicons} />
                            <TextInput
                                value={password}
                                placeholder="Enter Password"
                                style={[globalStyles.input, { flex: 1 }]}
                                placeholderTextColor={theme.colors.placeHolerText}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color={theme.colors.placeHolerText}
                                    style={{ marginLeft: 8 }}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Picker */}
                        <View style={globalStyles.inputRow}>
                            <School width={moderateScale(18)} height={moderateScale(18)} style={globalStyles.inputIonicons} />
                            <TextInput
                                placeholder="Enter School Name"
                                style={[globalStyles.input, { flex: 1 }]}
                                placeholderTextColor={theme.colors.placeHolerText}
                                value={schoolName}
                                onChangeText={(text) => {
                                    saveSchoolName(text);
                                    setSchoolName(text);
                                    setDbListFetched(false); // Reset dbListFetched when schoolName changes
                                    // Save school name to storage
                                }}
                                editable={!loading}
                            />
                            {loading && (
                                <ActivityIndicator size="small" color="#E10031" style={{ marginLeft: scale(8) }} />
                            )}
                        </View>

                        {/* Options */}
                        <View style={globalStyles.row}>
                            <View style={styles.rememberMeRow}>
                                <Checkbox
                                    status={rememberMeChecked}
                                    onPress={() => setRememberMeChecked(rememberMeChecked === 'checked' ? 'unchecked' : 'checked')}
                                    color={theme.colors.buttonPrimary}
                                />
                                <Text style={styles.smallText}>Remember me</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <Button
                            title="Login"
                            onPress={handleLogin}
                            disabled={loading || !dbListFetched || !username || !password}
                            loading={loginLoading}
                        />
                        {error && <Text style={styles.error}>{error}</Text>}
                    </View>
                </ScrollView>
            </SoftPinkRadialBackground>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: verticalScale(24),
    },
    formContainer: {
        backgroundColor: theme.colors.secondary,
        marginHorizontal: scale(16),
        marginTop: verticalScale(16),
        padding: scale(16),
        borderRadius: scale(12),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.1,
        shadowRadius: scale(4),
    },
    logo: {
        alignSelf: 'center',
        width: moderateScale(60),
        height: moderateScale(60),
        marginBottom: verticalScale(8),
    },
    title: {
        fontSize: moderateScale(28),
        fontFamily: theme.typography.fontFamilyBold,
        textAlign: 'center',
        color: theme.colors.headLineLabel,
        marginVertical: verticalScale(4),
    },
    subtitle: {
        textAlign: 'center',
        color: theme.colors.staticLabel,
        marginBottom: verticalScale(24),
        fontSize: moderateScale(16),
        lineHeight: moderateScale(20),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(24),
        flexWrap: 'wrap',
    },
    rememberMeRow: {
        flexDirection: 'row',
        color: theme.colors.staticLabel,
        alignItems: 'center',
        flex: 1,
    },
    forgotPassword: {
        color: theme.colors.dot,
        fontFamily: theme.typography.fontFamilySemiBold,
        fontSize: moderateScale(16),
        textAlign: 'right',
    },
    smallText: {
        fontSize: moderateScale(16),
        color: '#333',
        marginLeft: scale(4),
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: verticalScale(8),
        fontSize: moderateScale(14),
    },
    spinner: {
        marginTop: verticalScale(8),
    },
    sliderWrapper: {
        width: width,
        height: verticalScale(250),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(8),
        marginTop: verticalScale(8),
    },
    swiperContainer: {
        overflow: 'hidden',
        borderRadius: scale(16),
    },
    headerImage: {
        width: width,
        height: verticalScale(240),
        alignSelf: 'center',
    },
    customDot: {
        width: moderateScale(16),
        height: moderateScale(16),
        borderRadius: moderateScale(8),
        borderWidth: 2,
        borderColor: theme.colors.dot,
        backgroundColor: 'transparent',
        marginHorizontal: scale(4),
    },
    customActiveDot: {
        width: moderateScale(16),
        height: moderateScale(16),
        borderRadius: moderateScale(8),
        borderWidth: 2,
        borderColor: theme.colors.dot,
        backgroundColor: 'transparent',
        marginHorizontal: scale(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerActiveDot: {
        width: moderateScale(8),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: theme.colors.dot,
    },
    paginationStyle: {
        position: 'absolute',
        bottom: scale(8),
        alignSelf: 'center',
    },
});
