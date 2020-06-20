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

const ApiKeyQ = "?apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";
const ApiKey = "&apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";

export default class FavoriteRecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.route.params.uid,
      recipe: props.route.params.recipe,
      isRecipeInFavorites: false,
    };
  }

  componentDidMount() {
    this.checkIfInFav();
  }

  checkIfInFav = () => {
    firebase
      .database()
      .ref(`fav/${this.state.uid}/${this.state.recipe.recipeId}`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          this.setState({
            isRecipeInFavorites: true,
          });
        } else {
          this.setState({
            isRecipeInFavorites: false,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  addToFavorites = () => {
    firebase
      .database()
      .ref(`fav/${this.state.uid}/${this.state.recipe.recipeId}`)
      .push({
        recipeId: this.state.recipe.recipeId,
        imageUri: this.state.recipe.imageUri,
        title: this.state.recipe.title,
        readyInMinutes: this.state.recipe.readyInMinutes,
        servings: this.state.recipe.servings,
        healthScore: this.state.recipe.healthScore,
        calories: this.state.recipe.calories,
        ingredients: this.state.recipe.ingredients,
        instructions: this.state.recipe.instructions,
      })
      .then((data) => {
        this.setState({
          isRecipeInFavorites: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  removeFromFavorites = () => {
    firebase
      .database()
      .ref(`fav/${this.state.uid}/${this.state.recipe.recipeId}`)
      .remove()
      .then((data) => {
        this.setState({
          isRecipeInFavorites: false,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  addToMeals = () => {
    var calories = Math.ceil(
      this.state.recipe.calories / this.state.recipe.servings
    );
    firebase
      .database()
      .ref(`meals/${this.state.uid}`)
      .push({
        recipeId: this.state.recipe.recipeId,
        title: this.state.recipe.title,
        calories: calories,
        stepsLeft: calories * 20,
      })
      .then((data) => {
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.checkboxContainer}>
            <Image
              source={{ uri: this.state.recipe.imageUri }}
              style={{ width: 200, height: 200 }}
            />
            <View>
              <Text style={styles.title}>{this.state.recipe.title}</Text>
              <Text style={styles.info}>
                Preparation time: {this.state.recipe.readyInMinutes} min
              </Text>
              <Text style={styles.info}>
                Servings: {this.state.recipe.servings}
              </Text>
              <Text style={styles.info}>
                Health score: {this.state.recipe.healthScore}/100
              </Text>
              <Text style={styles.info}>
                Calories: {this.state.recipe.calories} cal
              </Text>
              {this.state.isRecipeInFavorites ? (
                <TouchableOpacity
                  onPress={this.removeFromFavorites}
                  style={styles.fav}
                >
                  <Text style={{ marginRight: 5, fontWeight: "bold" }}>
                    My Fav!
                  </Text>
                  <Ionicons name={"ios-heart"} size={24} color={"red"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={this.addToFavorites}
                  style={styles.fav}
                >
                  <Text style={{ marginRight: 5, fontWeight: "bold" }}>
                    Add to Fav!
                  </Text>
                  <Ionicons
                    name={"ios-heart-empty"}
                    size={24}
                    color={"black"}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={this.addToMeals} style={styles.fav}>
                <Text style={{ marginRight: 5, fontWeight: "bold" }}>
                  I ate one serving!
                </Text>
                <MaterialCommunityIcons name="food" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={{ fontWeight: "bold" }}>Ingredients: </Text>
        {this.state.recipe.ingredients.map((ing, i) => (
          <Text key={ing.id + i}>{ing.original}</Text>
        ))}
        <Text style={{ fontWeight: "bold" }}>Steps: </Text>
        {this.state.recipe.instructions ? (
          this.state.recipe.instructions.map((ins, j) => {
            return (
              <View key={j + 200000}>
                <Text>{ins.name}</Text>
                {ins.steps.map((step, i) => (
                  <Text key={i + 100000} style={{ textAlign: "justify" }}>
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
    width: 180,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 5,
    width: 180,
  },
});
