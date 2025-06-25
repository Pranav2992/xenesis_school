import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Platform, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { RootState } from '../../store';
import SoftPinkRadialBackground from '../../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
import moment from 'moment';
import theme from '../../theme';
import Calendar from '../../assets/images/calendar_img.svg';
import EditCalendar from '../../assets/images/edit_calendar_icon.svg';
import Class from '../../assets/images/class.svg';
import ClassRoom from '../../assets/images/class_room.svg';
import ActiveExam from '../../assets/images/active_exam.svg';
import DailyAssignment from '../../assets/images/daily_assignment.svg';
import StudentGroup from '../../assets/images/student_group.svg';
import Percentage from '../../assets/images/percentage.svg';
import ProfilePic from '../../assets/images/profile_pic.svg';
import { PieChart } from 'react-native-svg-charts';
const { width, height } = Dimensions.get('window');
import { getSession } from '../../storage';
import { fetchTeacherDashboard } from '../../slices/thunks';

// Responsive helper functions
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

type DashboardScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Dashboard'>;

type Props = {
    navigation: DashboardScreenNavigationProp;
};

type PieChartDataItem = { key: number; value: number; svg: object; label: string };

const Card = ({ title, value, icon, loading }: { title: string; value: number; icon: React.ReactNode; loading?: boolean }) => (
    <View style={styles.card}>
        <View style={styles.cardTopRow}>
            <View style={styles.cardIconWrapper}>{icon}</View>
            {loading ? <ActivityIndicator size="large" color={theme.colors.cardLabel} style={{ marginLeft: scale(4), position: 'absolute', right: 0, top: -10 }} />
                : <Text style={styles.cardValue}>{value}</Text>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
    </View>
);

const DashboardScreen: React.FC<Props> = ({ navigation }) => {

    const userSession = getSession();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Get dashboard state from Redux
    const {
        loading,
        attendance_rate,
        exam_count,
        assignment_count,
        class_count,
        classroom_count,
        male_students,
        female_students,
        total_students,
    } = useSelector((state: RootState) => state.root.dashboard);

    useEffect(() => {
        dispatch(fetchTeacherDashboard({
            "jsonrpc": 2.0,
            "params": {}
        }));
    }, [dispatch]);

    // Pie chart data from state
    const rawData = [
        { key: 1, value: male_students, svg: { fill: 'url(#gradBlue)' }, label: 'Male' },
        { key: 2, value: female_students, svg: { fill: 'url(#gradPink)' }, label: 'Female' },
    ];

    const pieData = rawData.map((item, index) => ({
        ...item,
        onPress: () => setSelectedIndex(index),
        onPressOut: () => setSelectedIndex(null),
        outerRadius: selectedIndex === index ? '110%' : '100%',
        padAngle: 0.02,
    }));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SoftPinkRadialBackground
                colors={[
                    theme.colors.lightBackgroundGradientColorShade1,
                    theme.colors.lightBackgroundGradientColorShade2,
                    theme.colors.lightBackgroundGradientColorShade3,
                    theme.colors.lightBackgroundGradientColorShade4
                ]}
                locations={[0, 0.3, 0.6, 1]}
            >
                <StatusBar barStyle="light-content" backgroundColor={theme.colors.iconPrimary} />

                {/* Header */}
                <View style={styles.headerWrapper}>
                    <View style={styles.menuIconWrapper}>
                        <Icon name="menu" size={moderateScale(28)} color={theme.colors.iconWhite} />
                    </View>
                    <View style={styles.headerCurve}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.hello}>Hello,</Text>
                            <Text style={styles.admin}>{userSession.result.name}</Text>
                        </View>
                    </View>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarCircle}>
                            {/* <Icon name="account-tie" size={moderateScale(40)} color="#D32F2F" /> */}
                            <ProfilePic />
                        </View>
                    </View>
                </View>

                {/* Date */}
                <View style={styles.dateCard}>
                    <Calendar width={moderateScale(24)} height={moderateScale(24)} />
                    <Text style={styles.dateText}>{moment(new Date()).format('DD MMM, YYYY')}</Text>
                    <EditCalendar width={moderateScale(17)} height={moderateScale(17)} />
                </View>

                {/* Students Card */}
                <View style={styles.studentsCard}>
                    <Text style={styles.studentsTitle}>Students</Text>
                    {/* Pie Chart */}
                    <View style={{ alignItems: 'center', height: moderateScale(200), justifyContent: 'center', }}>
                        {/* Gradients hidden */}

                        {loading ? (
                            <View style={{ height: moderateScale(160), width: moderateScale(160), alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color={theme.colors.cardLabel} />
                            </View>
                        ) : (
                            <View style={{ height: moderateScale(160), width: moderateScale(160), alignItems: 'center', justifyContent: 'center' }}>
                                <PieChart
                                    style={{ height: moderateScale(160), width: moderateScale(160) }}
                                    innerRadius={0.6}
                                    //outerRadius={10}
                                    valueAccessor={({ item }: { item: PieChartDataItem }) => item.value}
                                    data={pieData}
                                >
                                    <Defs>
                                        <LinearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <Stop offset="0%" stopColor={theme.colors.graphMalePrimary} stopOpacity={1} />
                                            <Stop offset="100%" stopColor={theme.colors.cardLabel} stopOpacity={1} />
                                        </LinearGradient>
                                        <LinearGradient id="gradPink" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <Stop offset="0%" stopColor={theme.colors.graphFemalePrimary} stopOpacity={1} />
                                            <Stop offset="100%" stopColor={theme.colors.iconPrimary} stopOpacity={1} />
                                        </LinearGradient>
                                    </Defs>
                                </PieChart>
                            </View>
                        )}
                    </View>
                    {/* Stats */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statsRow}>
                            <View style={styles.statsItem}>
                                <View style={[styles.legendColor, { backgroundColor: theme.colors.cardLabel }]} />
                                <Text style={styles.legendLabel}>Male</Text>
                                {loading && <ActivityIndicator size="small" color={theme.colors.cardLabel} style={{ marginLeft: scale(2) }} />}
                                {!loading && <Text style={styles.statsValue}>{male_students}</Text>}
                            </View>
                            <View style={styles.statsItem}>
                                <View style={styles.iconBg}>
                                    <StudentGroup width={16} height={16} />
                                </View>
                                <Text style={styles.legendLabel}>Total Students</Text>
                                {loading && <ActivityIndicator size="small" color={theme.colors.cardLabel} style={{ marginLeft: scale(2) }} />}
                                {!loading && <Text style={styles.statsValue}>{total_students}</Text>}
                            </View>
                        </View>
                        <View style={styles.statsRow}>
                            <View style={styles.statsItem}>
                                <View style={[styles.legendColor, { backgroundColor: theme.colors.iconPrimary }]} />
                                <Text style={styles.legendLabel}>Female</Text>
                                {loading && <ActivityIndicator size="small" color={theme.colors.cardLabel} style={{ marginLeft: scale(2) }} />}
                                {!loading && <Text style={styles.statsValue}>{female_students}</Text>}
                            </View>
                            <View style={styles.statsItem}>
                                <View style={styles.iconBg}>
                                    <Percentage width={16} height={16} />
                                </View>
                                <Text style={styles.legendLabel}>Attendance Rate</Text>
                                {loading && <ActivityIndicator size="small" color={theme.colors.cardLabel} style={{ marginLeft: scale(2) }} />}
                                {!loading && <Text style={styles.statsValueBlue}>{attendance_rate}%</Text>}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Info Cards */}
                <View style={styles.grid}>
                    <Card title="Class" value={class_count} icon={<Class width={moderateScale(40)} height={moderateScale(40)} />} loading={loading} />
                    <Card title="Class Room" value={classroom_count} icon={<ClassRoom width={moderateScale(40)} height={moderateScale(40)} />} loading={loading} />
                    <Card title="Active Exams" value={exam_count} icon={<ActiveExam width={moderateScale(40)} height={moderateScale(40)} />} loading={loading} />
                    <Card title="Daily Assignments" value={assignment_count} icon={<DailyAssignment width={moderateScale(40)} height={moderateScale(40)} />} loading={loading} />
                </View>
            </SoftPinkRadialBackground>
        </SafeAreaView>
    );
};

export default DashboardScreen;

// Styles...
const styles = StyleSheet.create({
    headerWrapper: { position: 'relative', alignItems: 'center', backgroundColor: 'transparent', paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20) },
    menuIconWrapper: { position: 'absolute', top: verticalScale(18), left: scale(18), zIndex: 2, padding: scale(8) },
    headerCurve: { width: width * 1.3, height: verticalScale(200), backgroundColor: theme.colors.iconPrimary, borderBottomStartRadius: width * 2, borderBottomEndRadius: width * 2, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: verticalScale(40), marginTop: -verticalScale(90), shadowColor: '#000', shadowOffset: { width: 0, height: scale(6) }, shadowOpacity: 1, shadowRadius: width * 2, elevation: 8 },
    hello: { color: theme.colors.screenTitle, fontSize: moderateScale(22), fontFamily: theme.typography.fontFamilyBold, textAlign: 'center' },
    admin: { color: theme.colors.screenTitle, fontSize: moderateScale(15), fontFamily: theme.typography.fontFamilyMedium, textAlign: 'center' },
    avatarWrapper: { position: 'absolute', left: 0, right: 0, bottom: -verticalScale(32), alignItems: 'center', zIndex: 9 },
    avatarCircle: { width: moderateScale(64), height: moderateScale(64), borderRadius: moderateScale(32), backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#D01F4285', shadowColor: '#000', shadowOffset: { width: 0, height: scale(2) }, shadowOpacity: 0.2, shadowRadius: scale(4), elevation: 4 },
    dateCard: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: scale(12), marginHorizontal: scale(24), marginTop: verticalScale(32) },
    dateText: { textAlign: 'center', color: theme.colors.textInputText, fontFamily: theme.typography.fontFamilyBold, fontSize: moderateScale(16), paddingHorizontal: scale(16) },
    studentsCard: { backgroundColor: theme.colors.cardBackground, borderRadius: scale(16), marginHorizontal: scale(16), marginTop: verticalScale(24), padding: scale(16), alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: scale(2) }, shadowOpacity: 0.08, shadowRadius: scale(4) },
    studentsTitle: { fontFamily: theme.typography.fontFamilyBold, fontSize: moderateScale(15), color: theme.colors.cardTitle, marginBottom: scale(8) },
    statsGrid: { width: '100%', paddingHorizontal: scale(8) },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: scale(4) },
    statsItem: { flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: scale(120), marginRight: scale(8) },
    legendColor: { width: moderateScale(18), height: moderateScale(18), borderRadius: scale(4), marginRight: scale(6) },
    iconBg: { width: moderateScale(18), height: moderateScale(18), borderRadius: scale(4), backgroundColor: theme.colors.iconBackground, alignItems: 'center', justifyContent: 'center', marginRight: scale(6) },
    legendLabel: { fontSize: moderateScale(13), color: theme.colors.cardTitle, marginRight: scale(4), fontFamily: theme.typography.fontFamilyBold },
    statsValue: { fontSize: moderateScale(13), color: theme.colors.cardValue, fontFamily: theme.typography.fontFamilyBold, marginLeft: scale(2) },
    statsValueBlue: { fontSize: moderateScale(13), color: theme.colors.cardValue, fontFamily: theme.typography.fontFamilyBold, marginLeft: scale(2) },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: scale(16), marginTop: verticalScale(24), paddingBottom: verticalScale(20) },
    card: { width: (width - scale(48)) / 2, padding: scale(16), borderWidth: 1, borderColor: theme.colors.cardBorder, borderRadius: scale(12), alignItems: 'center', marginBottom: verticalScale(16), backgroundColor: theme.colors.cardBackground, elevation: 2, shadowColor: theme.colors.textInputText, shadowOffset: { width: 0, height: scale(2) }, shadowOpacity: 0.08, shadowRadius: scale(4), minHeight: verticalScale(100) },
    cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: scale(8) },
    cardIconWrapper: { flex: 1, alignItems: 'flex-start' },
    cardValue: { fontFamily: theme.typography.fontFamilyBold, color: theme.colors.cardLabel, fontSize: moderateScale(27), textAlign: 'right', flex: 1, position: 'absolute', right: 0, top: -10 },
    cardTitle: { fontSize: moderateScale(15), color: theme.colors.cardTitle, fontFamily: theme.typography.fontFamilyBold, textAlign: 'center', marginTop: scale(4) },
});
