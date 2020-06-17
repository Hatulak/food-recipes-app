import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen2, NotificationsScreen } from "../App";
import LogoutScreen from "./auth/LogoutScreen";

const Drawer = createDrawerNavigator();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen2} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
