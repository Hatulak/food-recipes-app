import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "./views/auth/LoginScreen";
import RegisterScreen from "./views/auth/RegisterScreen";
import LogoutScreen from "./views/auth/LogoutScreen";
import ForgotPasswordScreen from "./views/auth/ForgotPasswordScreen";
import SearchNavigator from "./views//search/SearchNavigator";
import FavoritesStack from './views/favorites/FavoritesStack';
import StepperStack from './views/stepper/StepperStack';
import ApiKeys from "./constants/ApiKeys";
import firebase from "firebase";
import { AppLoading } from "expo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false,
      uid: "",
    };
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid });
        this.setState({ isAuthenticationReady: true });
        this.setState({ isAuthenticated: !!user });
      } else {
        this.setState({ uid: "" });
        this.setState({ isAuthenticationReady: true });
        this.setState({ isAuthenticated: !!user });
      }
    });
  }

  render() {
    if (!this.state.isAuthenticationReady) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (this.state.isAuthenticated) {
      return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "SearchNavigator") {
                  iconName = "ios-search";
                } else if (route.name === "FavoritesStack") {
                  iconName = focused ? "ios-heart" : "ios-heart-empty";
                } else if (route.name === "StepperStack") {
                  iconName = "ios-walk";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="SearchNavigator" options={{title: 'Search'}}>
              {(props) => <SearchNavigator {...props} uid={this.state.uid} />}
            </Tab.Screen>
            <Tab.Screen name="FavoritesStack" options={{title: 'Favorites'}}>
              {(props) => <FavoritesStack {...props} uid={this.state.uid} />}
            </Tab.Screen>
            <Tab.Screen name="StepperStack" options={{title: 'Burn your meals'}}>
              {(props) => <StepperStack {...props} uid={this.state.uid} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
