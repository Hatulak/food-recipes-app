import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  Picker,
  CheckBox,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";
import { Pedometer } from "expo-sensors";

const ApiKeyQ = "?apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";
const ApiKey = "&apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";

export default class StepperScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
      loading: true,
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
      lastStepCount: 0,
      meals: [],
      mealToBurnId: null,
      change: false,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`meals/${this.state.uid}`)
      .on("value", (snapshot) => {
        var _temp = [];
        snapshot.forEach((item) => {
          _temp.push({ key: item.key, meal: item.val() });
        });

        var mealToBurn = _temp.length !== 0 ? _temp[0].key : null;
        this.setState({
          meals: _temp,
          loading: false,
          mealToBurnId: mealToBurn,
        });
      });

    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate() {
    if (
      this.state.change &&
      this.state.meals.length !== 0 &&
      this.state.mealToBurnId !== null
    ) {
      this.setState({
        change: false,
      });
      if (
        this.state.meals.find((obj) => obj.key === this.state.mealToBurnId).meal
          .stepsLeft <= 0
      ) {
        firebase
          .database()
          .ref(`meals/${this.state.uid}/${this.state.mealToBurnId}`)
          .remove();

        Alert.alert("Congrats! You burned your meal!");
      } else {
        firebase
          .database()
          .ref(`meals/${this.state.uid}/${this.state.mealToBurnId}`)
          .update({
            stepsLeft:
              this.state.meals.find(
                (obj) => obj.key === this.state.mealToBurnId
              ).meal.stepsLeft -
              (this.state.currentStepCount - this.state.lastStepCount),
          });
      }
    }
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount((result) => {
      let steps = this.state.currentStepCount;
      this.setState({
        lastStepCount: steps,
        currentStepCount: result.steps,
        change: true,
      });
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      (error) => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        this.setState({ pastStepCount: result.steps });
      },
      (error) => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontWeight: "bold", marginLeft: 5, marginBottom: 5,}}>
            Walk! Steps you made now: {this.state.currentStepCount}
          </Text>

          <FlatList
            data={this.state.meals}
            keyExtractor={(m) => m.key}
            renderItem={(m) => (
              <View style={styles.checkboxContainer}>
                <MaterialCommunityIcons
                  name="run-fast"
                  size={34}
                  color="black"
                />
                <View style={{ marginLeft: 5, marginBottom: 2 }}>
                  <Text style={styles.title}>{m.item.meal.title}</Text>
                  <Text style={styles.info}>
                    Meal calories: {m.item.meal.calories} cal. Steps left:{" "}
                    {m.item.meal.stepsLeft}
                  </Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={this.renderSeparator}
            onEndReachedThreshold={0.4}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#eee",
    marginTop: 10,
    // alignItems: "center",
  },
  queryContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  fav: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    paddingLeft: 20,
    width: 250,
    height: 40,
    borderColor: "gray",
    color: "black",
    borderRadius: 10,
    borderStyle: "solid",
    backgroundColor: "#fff",
    // margin: 5,
  },
  label: {
    marginTop: 5,
  },
  text: {
    padding: 5,
    marginTop: 10,
    textAlign: "justify",
    fontSize: 17,
  },
  button: {
    borderRadius: 10,
    width: 100,
    backgroundColor: "#aeaeae",
    padding: 7,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  summary: {
    flex: 1,
  },
  info: {
    marginLeft: 5,
    width: 320,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 5,
    width: 320,
  },
});
