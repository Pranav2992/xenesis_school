import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Keys for storage
export const SESSION_KEY = 'user_session';
export const SCHOOL_NAME_KEY = 'school_name';

// Save session data
export const saveSession = (session: object) => {
    storage.set(SESSION_KEY, JSON.stringify(session));
};

// Get session data
export const getSession = (): any | null => {
    const value = storage.getString(SESSION_KEY);
    return value ? JSON.parse(value) : null;
};

// Remove session data
export const removeSession = () => {
    storage.delete(SESSION_KEY);
};

// Save school name
export const saveSchoolName = (schoolName: string) => {
    storage.set(SCHOOL_NAME_KEY, schoolName);
};

// Get school name
export const getSchoolName = (): string | null => {
    return storage.getString(SCHOOL_NAME_KEY) || null;
};

// Remove school name
export const removeSchoolName = () => {
    storage.delete(SCHOOL_NAME_KEY);
};
