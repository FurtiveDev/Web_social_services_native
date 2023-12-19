import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeviceScreen from './screens/DeviceScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import ServiceScreen from './screens/ServiceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Service' component={ServiceScreen} />
                    <Stack.Screen name='Device' component={DeviceScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}