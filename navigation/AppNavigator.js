import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DeckTabNavigator from './DeckTabNavigator';

export default createAppContainer(DeckTabNavigator);
