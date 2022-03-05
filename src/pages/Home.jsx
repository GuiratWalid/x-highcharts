import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ThemeContext from '../context/context';

const Home = () => {

    const [slogans, setSlogans] = useState(
        [
            'Create your interactive charts for web and mobile projects',
            'Build data visualization with Angular, React, 