import 'react-native-gesture-handler';
import * as React from 'react';
import { initLocalizable } from './utils/localizable/localizable';
import ThemeContextProvider from './utils/contexts/ThemeContext';
import TimeContextProvider from './utils/contexts/TimeContext';
import LanguageContextProvider from './utils/contexts/LanguageContext';
import AppNavigator from './components/AppNavigator';

export default function App() {
  initLocalizable()
  return (
    <LanguageContextProvider>
      <ThemeContextProvider>
        <TimeContextProvider>
          <AppNavigator />
        </TimeContextProvider>
      </ThemeContextProvider>
    </LanguageContextProvider>
  );
}
