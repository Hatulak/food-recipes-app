import React from "react";
import { StyleSheet, Text, Button, View, Picker, CheckBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchByQueryStack from "./SearchByQueryStack";
import LogoutScreen from "../auth/LogoutScreen";

const Drawer = createDrawerNavigator();

export default class SearchNavigator extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      uid : props.uid,
    };
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="Search recipe by name">
          <Drawer.Screen name="Search recipe by name and cuisine/diet">{props => <SearchByQueryStack {...props} uid={this.state.uid} />}</Drawer.Screen>
          {/* <Drawer.Screen name="SearchByQuery" component={SearchByQuery} /> */}
          {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
          <Drawer.Screen name="Logout" component={LogoutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
