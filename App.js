import 'react-native-gesture-handler';
import * as React from 'react';
import { initLocalizable, translate } from './utils/localizable/localizable';
import ThemeContextProvider from './utils/contexts/ThemeContext';
import TimeContextProvider from './utils/contexts/TimeContext';
import AppNavigator from './components/AppNavigator';

export default function App() {
  initLocalizable()
  return (
    <ThemeContextProvider>
      <TimeContextProvider>
        <AppNavigator />
      </TimeContextProvider>
    </ThemeContextProvider>
  );
}
