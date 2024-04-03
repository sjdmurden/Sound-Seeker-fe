import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  searchAllFestivals,
  getArtistId,
  getFestivalByArtist,
  getFestivalByLocation,
} from "../api";
import FestivalList from "./FestivalList";
import { SegmentedButtons } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import * as Location from "expo-location";
import LogOut from "./LogOut";
import { Searchbar } from "react-native-paper";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { UserContext } from "../Contexts/user";
import { LinearGradient } from "expo-linear-gradient";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [festivalResult, setFestivalResult] = useState([]);
  const [selectedTab, setSelectedTab] = useState("festival");
  const [radius, setRadius] = useState("");
  const [location, setLocation] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const data = [
    { key: 20, value: "up to 20 miles" },
    { key: 40, value: "up to 40 miles" },
    { key: 80, value: "up to 80 miles" },
    { key: 100, value: "up to 100 miles" },
    { key: 200, value: "up to 200 miles" },
  ];

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  useEffect(() => {
    setError("");
    setFestivalResult("");
  }, [selectedTab]);

  function handleFestivalSearch() {
    setIsLoading(true)
    if (selectedTab === "festival") {
      searchAllFestivals(input).then((response) => {
        const results = response.data.results;
        if (results.length > 0) {
          setError("");
          const loadingResults = results.map((festival) => {
            festival.isLoaded = false;
            return festival;
          });
          setFestivalResult(loadingResults);
        } else {
          setFestivalResult([]);
          setError("Sorry, no festival matches your search");
        }
        setInput("");
      });
    }
    if (selectedTab === "artist") {
      getArtistId(input)
        .then((response) => {
          const artistId = response.data.results[0].id;
          getFestivalByArtist(artistId).then((response) => {
            if (response.data.results.length > 0) {
              setError("");
              setFestivalResult(response.data.results);
            } else {
              setFestivalResult([]);
              setError(
                "Sorry, the artist is not currently playing any festivals"
              );
            }
          });
        })
        .catch((err) => {
          setError("Sorry, no artist matches your search");
        });
      setInput("");
    }
    if (selectedTab === "location") {
      getFestivalByLocation(location, radius).then((response) => {
        setFestivalResult(response.data.results);
        if (response.data.results.length > 0) {
          setFestivalResult(response.data.results);
        } else {
          setError("Sorry, there are no festivals within this distance");
        }
        setInput("");
      });
    }
  }

  const handleSelectTab = (tab) => {
    setSelectedTab(tab);
  };

  const changeButtonStyle = (tab) => {
    return selectedTab === tab ? styles.buttonPress : styles.button;
  };

  return (
    <LinearGradient
      colors={["rgb(4,32,84)", "rgb(4,69,108)"]}
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor="#61dafb" />
      <SafeAreaView edges={["right", "left", "top"]}>
        {fontsLoaded && <Text style={styles.title}>Sound Seeker</Text>}
        <Text style={styles.welcome}>Welcome {loggedInUser.display_name}</Text>
          <View
            style={styles.buttonsContainer}
            onPress={() => handleSelectTab("festival")}
          >
            <TouchableOpacity
              style={changeButtonStyle("festival")}
              onPress={() => handleSelectTab("festival")}
            >
              <Text style={changeButtonStyle("festival")}>Festival</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={changeButtonStyle("artist")}
              onPress={() => handleSelectTab("artist")}
            >
              <Text style={changeButtonStyle("artist")}>Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={changeButtonStyle("location")}
              onPress={() => handleSelectTab("location")}
            >
              <Text style={changeButtonStyle("location")}>Location</Text>
            </TouchableOpacity>
          </View>
     
      {selectedTab !== "location" ? (
        <Searchbar
          placeholder="Search..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleFestivalSearch}
          style={styles.searchBox}
        />
      ) : (
        <SelectList
          setSelected={(key) => setRadius(key)}
          data={data}
          save="key"
          onSelect={handleFestivalSearch}
          inputStyles={styles.inputLocationBox}
          boxStyles={styles.locationSearchBox}
          dropdownStyles={styles.dropdown}
          dropdownTextStyles={styles.dropdownTextStyles}
          dropdownItemStyles={styles.dropdownItemStyles}
        />
      )}
      {
        Object.keys(festivalResult).length > 0 ?
        <FestivalList
          festivalResult={festivalResult}
          setFestivalResult={setFestivalResult}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          location={location}
        />
        :
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            padding: 10,
            fontWeight: "bold",
          }}
        >
          {error}
        </Text>
      }

      <LogOut />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: "white",
    paddingLeft: 20,
    paddingTop: 30,
    fontFamily: "Lobster_400Regular",
  },
  welcome: {
    fontSize: 20,
    color: "white",
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 40,
  },
  page: {
    // backgroundColor: "#fef3df",
  },
  searchBox: {
    backgroundColor: "#faf8fc",
    borderRadius: 20,
    margin: 20,
    marginTop: 0,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowColor: "#17212b",
    shadowRadius: 5,
    marginTop: 35,
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 0,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 20,
    padding: 2,
    paddingBottom: 4,
    paddingTop: 4,
  },
  buttonPress: {
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 20,
    marginTop: 0,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: "#cf2c1f",
    padding: 2,
    paddingBottom: 4,
    paddingTop: 4,
    color: "white",
  },
  textPress: {
    color: "white",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonNormal: {
    backgroundColor: "white",
    color: "#F8C383",
  },
  locationSearchBox: {
    borderColor: "#faf8fc",
    backgroundColor: "#faf8fc",
    borderRadius: 20,

    margin: 20,
    marginTop: 35,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowColor: "#17212b",
    shadowRadius: 5,
  },
  inputLocationBox: {
    padding: 7,
    fontSize: 14,
  },
  dropdown: {
    borderColor: "#faf8fc",
    backgroundColor: "#faf8fc",
    borderRadius: 20,
    padding: 10,
    margin: 20,
    marginTop: 0,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowColor: "#17212b",
    shadowRadius: 5,
  },
  dropdownTextStyles: {
    fontSize: 14,
  },
});

export default SearchScreen;