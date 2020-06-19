import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Picker,
  CheckBox,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import FavoriteItemRow from "./components/FavoriteItemRow";

export default class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
      favRecipes: [],
    };
    // this.getFavorites();
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`fav/${this.state.uid}`)
      .on("value", (snapshot) => {
        var _temp = [];
        snapshot.forEach((item) => {
          item.forEach((nested) => {
            _temp.push(nested.val());
          });
        });
        _temp.sort(function(a, b) {
            var textA = a.title.toLowerCase();
            var textB = b.title.toLowerCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });
        this.setState({ favRecipes: _temp });
      });
  }

  //   getFavorites = () => {
  //     firebase
  //       .database()
  //       .ref(`fav/${this.state.uid}`)
  //       .on("value", (snapshot) => {
  //         var _temp = [];
  //         snapshot.forEach((item) => {
  //           item.forEach((nested) => {
  //             _temp.push(nested.val());
  //           });
  //         });
  //         this.state.favRecipes = _temp;
  //       });
  //   };

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
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.favRecipes}
          keyExtractor={(recipe) => recipe.recipeId.toString()}
          renderItem={(recipe) => (
            <FavoriteItemRow
              props={this.props}
              recipe={recipe}
              uid={this.props.uid}
              navigation={this.props.navigation}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 2,
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
});
