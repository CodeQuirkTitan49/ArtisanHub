import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AbstractTabBar } from '@/navigation/AbstractTabBar';
import {
  ArtisanExploreScreen,
  ArtisanHomeScreen,
  ArtisanOrdersScreen,
} from '@/screens/artisan/ArtisanScreens';
import { ProfileScreen } from '@/screens/shared/ProfileScreen';

const Tab = createBottomTabNavigator();

export function ArtisanNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <AbstractTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={ArtisanHomeScreen} />
      <Tab.Screen name="Explore" component={ArtisanExploreScreen} />
      <Tab.Screen name="Orders" component={ArtisanOrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
