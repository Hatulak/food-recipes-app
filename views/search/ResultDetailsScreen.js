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

const ApiKeyQ = "?apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";
const ApiKey = "&apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";

export default class ResultDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.route.params.uid,
      recipeId: props.route.params.recipeId,
      loading: true,
      recipeDetails: {},
      instructions: [],
      ingredients: [],
      calories: null,
    };
    this.getRecipeDetails();
    this.getInstructions();
  }

  getRecipeDetails = () => {
    fetch(
      "https://api.spoonacular.com/recipes/" +
        this.state.recipeId +
        "/information?includeNutrition=true" +
        ApiKey
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          recipeDetails: json,
          calories: json.nutrition.nutrients.find(
            (obj) => obj.title === "Calories"
          ),
          ingredients: json.extendedIngredients,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getInstructions = () => {
    fetch(
      "https://api.spoonacular.com/recipes/" +
        this.state.recipeId +
        "/analyzedInstructions" +
        ApiKeyQ
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        this.setState({
          instructions: json,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.checkboxContainer}>
            <Image
              source={{ uri: this.state.recipeDetails.image }}
              style={{ width: 200, height: 200 }}
            />
            <View>
              <Text style={styles.title}>{this.state.recipeDetails.title}</Text>
              <Text style={styles.info}>
                Preparation time: {this.state.recipeDetails.readyInMinutes} min
              </Text>
              <Text style={styles.info}>
                Servings: {this.state.recipeDetails.servings}
              </Text>
              <Text style={styles.info}>
                Health score: {this.state.recipeDetails.healthScore}/100
              </Text>
              {this.state.calories ? (
                <Text style={styles.info}>
                  Calories: {this.state.calories.amount} cal per serving
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {this.state.ingredients.map((ing) => (
          <Text key={ing.id}>{ing.original}</Text>
        ))}
        <Text>Steps: </Text>
        {this.state.instructions ? (
          this.state.instructions.map((ins) => {
            return (
              <View>
                <Text>{ins.name}</Text>
                {ins.steps.map((step, i) => (
                  <Text>
                    {i + 1}. {step.step}
                  </Text>
                ))}
              </View>
            );
          })
        ) : (
          <Text>Empty... :(</Text>
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#eee",
    // alignItems: "center",
  },
  queryContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
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
    width: 180,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 5,
    width: 180,
  },
});
