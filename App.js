import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './components/Game';
import { initLocalizable } from './utils/localizable/localizable';
import ThemeContextProvider from './utils/contexts/ThemeContext';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  initLocalizable()
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name="Game" component={Game} options={{ headerShown: false }} />
        </Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}