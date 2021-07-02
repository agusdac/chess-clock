import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './Game';
import { translate } from '../utils/localizable/localizable';
import TimeList from './TimeList';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react/cjs/react.development';
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AddTime from './AddTime';
import Settings from './Settings';

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigator() {
    const { theme } = useContext(ThemeContext)

    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerTitleStyle: {
                    fontSize: 18,
                    color: theme.contrast
                },
                headerStyle: {
                    backgroundColor: theme.background,
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerBackImage: () => (
                    <Ionicons name="md-arrow-back" color={theme.contrast} size={24}
                        style={{ marginLeft: Platform.OS === 'ios' ? 10 : 0 }} />
                ),
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
            }}>
                <Screen name="Game" component={Game} options={{ headerShown: false }} />
                <Screen name="TimeList" component={TimeList} options={({ navigation }) => ({
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', marginRight: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('AddTime')} style={{ marginRight: 10, paddingVertical: 5 }} >
                                <MaterialIcons name="add" color={theme.contrast} size={24} />
                            </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('Settings')} >
                                <MaterialIcons name="settings" color={theme.contrast} size={24} style={{ paddingVertical: 5 }} />
                            </TouchableOpacity>
                        </View>
                    ),
                    title: translate('timeControl')
                }
                )} />
                <Screen name="AddTime" component={AddTime} options={{ title: translate('newTimeControl') }} />
                <Screen name="Settings" component={Settings} options={{ title: translate('settings') }} />
            </Navigator>
        </NavigationContainer>
    );
}