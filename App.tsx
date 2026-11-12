import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/navigation/types';

import WelcomeScreen from './src/features/compras/WelcomeScreen';
import ListaComprasScreen from './src/features/compras/ListaComprasScreen';
import HistoricoScreen from './src/features/compras/HistoricoScreen';
import DetalhesItemScreen from './src/features/compras/DetalhesItemScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListaCompras"
          component={ListaComprasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Historico"
          component={HistoricoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalhesItem"
          component={DetalhesItemScreen}
          options={{ title: 'Detalhes do Artigo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}