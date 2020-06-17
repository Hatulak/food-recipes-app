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
import HomeScreen from "./views/HomeScreen";
import LoginScreen from "./views/auth/LoginScreen";
import RegisterScreen from "./views/auth/RegisterScreen";
import LogoutScreen from "./views/auth/LogoutScreen";
import ForgotPasswordScreen from "./views/auth/ForgotPasswordScreen";
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
        this.setState({ uid: '' });
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

                if (route.name === "Home") {
                  iconName = focused
                    ? "ios-information-circle"
                    : "ios-information-circle-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "ios-list-box" : "ios-list";
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
            <Tab.Screen name="Home">{props => <HomeScreen {...props} uid={this.state.uid} />}</Tab.Screen>
            <Tab.Screen name="Settings">{props => <SettingsScreen {...props} uid={this.state.uid} />}</Tab.Screen>
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

export function HomeScreen2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

export function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
