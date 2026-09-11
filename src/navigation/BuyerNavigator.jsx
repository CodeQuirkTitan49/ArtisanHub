import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AbstractTabBar } from '@/navigation/AbstractTabBar';
import {
  BuyerCartScreen,
  BuyerExploreScreen,
  BuyerHomeScreen,
} from '@/screens/buyer/BuyerScreens';
import { ProfileScreen } from '@/screens/shared/ProfileScreen';

const Tab = createBottomTabNavigator();

export function BuyerNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <AbstractTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={BuyerHomeScreen} />
      <Tab.Screen name="Explore" component={BuyerExploreScreen} />
      <Tab.Screen name="Cart" component={BuyerCartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
