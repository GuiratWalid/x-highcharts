import { createContext } from 'react';

const ThemeContext = createContext({
    darkTheme: false,
    setDarkTheme: () => { }
});

export default ThemeContext;