import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    colors: {
      primaryBlack: '#000000',
      primaryCharcoal: '#2c2c2c',
      primaryDeepBrown: '#3a2618',
      accentGold: '#C9A24D',
      accentRoseGold: '#e6bc94',
      accentChampagne: '#f7e7ce',
      backgroundIvory: '#fdfdfd',
      textLight: '#ffffff',
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Poppins', sans-serif",
    },
    isGoldMode: true,
  });

  const toggleGoldMode = () => {
    setTheme(prev => ({
      ...prev,
      isGoldMode: !prev.isGoldMode,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleGoldMode }}>
      {children}
    </ThemeContext.Provider>
  );
};