import React, { createContext, ReactNode } from 'react';
import theme, { Theme } from '../theme';

export const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};
