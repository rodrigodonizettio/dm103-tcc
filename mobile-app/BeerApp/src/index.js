import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './pages/main';

import './config/StatusBarConfig';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        /** TODO: must define number of application pages (maybe two simple: GET page (read values), SET page (config values))  **/
        <Stack.Screen name="Beer App" component={MainScreen} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;