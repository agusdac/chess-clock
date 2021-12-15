import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './Game';
import TimeList from './TimeList';
import { Platform, View } from 'react-native';
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { LanguageContext } from '../utils/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import AddTime from './AddTime';
import Settings from './settings/Settings';
import TouchableIcon from './shared/TouchableIcon';

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigator() {
    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)

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
                            <TouchableIcon onPress={() => navigation.navigate('AddTime')} style={{ marginRight: 10, paddingVertical: 5 }}
                                name="add" color={theme.contrast} size={24} family={'MaterialIcons'} />
                            <TouchableIcon onPress={() => navigation.navigate('Settings')} style={{ paddingVertical: 5 }}
                                name="settings" color={theme.contrast} size={24} family={'MaterialIcons'} />
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
