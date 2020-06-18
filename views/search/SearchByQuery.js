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
import SearchItemRow from "./components/SearchItemRow";

const RESULTS_NUMBER = 10;
const ApiKey = "&apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";

export default class SearchByQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
      query: "",
      cuisineCheck: false,
      cuisine: "Italian",
      dietCheck: false,
      diet: "Vegetarian",
      results: [],
      offset: 0,
      fetching_data: false,
      loading: true,
      limit: false,
    };
  }

  showResults = () => {
    if (this.state.query === "") {
      Alert.alert("You need to type something...");
    }
    let cuisineString = this.state.cuisineCheck
      ? "&cuisine=" + this.state.cuisine
      : "";
    let dietString = this.state.dietCheck ? "&diet=" + this.state.diet : "";
    this.setState({ fetching_data: true });
    fetch(
      "https://api.spoonacular.com/recipes/search" +
        "?query=" +
        this.state.query +
        cuisineString +
        dietString +
        "&number=" +
        RESULTS_NUMBER +
        "&offset=" +
        this.state.offset +
        ApiKey
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.results.length === 0) {
          this.setState({ limit: true });
        }
        this.setState({
          results: [...this.state.results, ...json.results],
          offset: this.state.offset + RESULTS_NUMBER,
          loading: false,
          fetching_data: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          fetching_data: false,
        });
      });
  };

  renderFooter = () => {
    if (!this.state.fetching_data) {
      if (this.state.limit) return <Text>That's all</Text>;
      return null;
    }
    return <ActivityIndicator style={{ color: "#000" }} />;
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

  handleLoadMore = () => {
    if (!this.state.limit) {
      if (!this.state.fetching_data) {
        this.showResults();
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            value={this.state.query}
            style={styles.input}
            value={this.state.email}
            placeholder="Recipe name"
            onChangeText={(text) => {
              this.setState({ query: text });
            }}
          ></TextInput>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={this.state.cuisineCheck}
              onValueChange={(val) => {
                this.setState({ cuisineCheck: val });
              }}
            />
            <Text style={styles.label}>Do you want to pick cuisine?</Text>
          </View>
          {this.state.cuisineCheck ? (
            <Picker
              selectedValue={this.state.cuisine}
              onValueChange={(itemValue) =>
                this.setState({ cuisine: itemValue })
              }
            >
              <Picker.Item label={"African"} value={"African"} />
              <Picker.Item label={"American"} value={"American"} />
              <Picker.Item label={"British"} value={"British"} />
              <Picker.Item label={"Cajun"} value={"Cajun"} />
              <Picker.Item label={"Caribbean"} value={"Caribbean"} />
              <Picker.Item label={"Chinese"} value={"Chinese"} />
              <Picker.Item
                label={"Eastern European"}
                value={"Eastern European"}
              />
              <Picker.Item label={"European"} value={"European"} />
              <Picker.Item label={"French"} value={"French"} />
              <Picker.Item label={"German"} value={"German"} />
              <Picker.Item label={"Greek"} value={"Greek"} />
              <Picker.Item label={"Indian"} value={"Indian"} />
              <Picker.Item label={"Irish"} value={"Irish"} />
              <Picker.Item label={"Italian"} value={"Italian"} />
              <Picker.Item label={"Japanese"} value={"Japanese"} />
              <Picker.Item label={"Jewish"} value={"Jewish"} />
              <Picker.Item label={"Korean"} value={"Korean"} />
              <Picker.Item label={"Latin American"} value={"Latin American"} />
              <Picker.Item label={"Mediterranean"} value={"Mediterranean"} />
              <Picker.Item label={"Mexican"} value={"Mexican"} />
              <Picker.Item label={"Middle Eastern"} value={"Middle Eastern"} />
              <Picker.Item label={"Nordic"} value={"Nordic"} />
              <Picker.Item label={"Southern"} value={"Southern"} />
              <Picker.Item label={"Spanish"} value={"Spanish"} />
              <Picker.Item label={"Thai"} value={"Thai"} />
              <Picker.Item label={"Vietnamese"} value={"Vietnamese"} />
            </Picker>
          ) : (
            <View></View>
          )}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={this.state.dietCheck}
              onValueChange={(val) => {
                this.setState({ dietCheck: val });
              }}
            />
            <Text style={styles.label}>Do you want to pick diet?</Text>
          </View>
          {this.state.dietCheck ? (
            <Picker
              selectedValue={this.state.diet}
              onValueChange={(itemValue) => this.setState({ diet: itemValue })}
            >
              <Picker.Item label={"Gluten Free"} value={"Gluten Free"} />
              <Picker.Item label={"Ketogenic"} value={"Ketogenic"} />
              <Picker.Item label={"Vegetarian"} value={"Vegetarian"} />
              <Picker.Item
                label={"Lacto-Vegetarian"}
                value={"Lacto-Vegetarian"}
              />
              <Picker.Item label={"Ovo-Vegetarian"} value={"Ovo-Vegetarian"} />
              <Picker.Item label={"Vegan"} value={"Vegan"} />
              <Picker.Item label={"Pescetarian"} value={"Pescetarian"} />
              <Picker.Item label={"Paleo"} value={"Paleo"} />
              <Picker.Item label={"Primal"} value={"Primal"} />
              <Picker.Item label={"Whole30"} value={"Whole30"} />
            </Picker>
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showResults()}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {this.state.loading ? null : (
            <FlatList
              data={this.state.results}
              keyExtractor={(result) => result.id.toString()}
              renderItem={(result) => (
                <SearchItemRow
                  props={this.props}
                  result={result}
                  uid={this.props.uid}
                />
              )}
              ListFooterComponent={this.renderFooter}
              ItemSeparatorComponent={this.renderSeparator}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.4}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
  },
  label: {
    margin: 6,
  },
  list: {
    flex: 1,
    padding: 1,
  },
});
