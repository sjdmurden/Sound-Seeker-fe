import * as React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput, Text, ScrollView } from "react-native";
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
import Loading from "./Loading";
import { useContext } from "react";
import { UserContext } from "../Contexts/user";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [festivalResult, setFestivalResult] = useState([]);
  const [selectedTab, setSelectedTab] = useState("festival");
  const [radius, setRadius] = useState("");
  const [location, setLocation] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    { key: 20, value: "up to 20 miles" },
    { key: 40, value: "up to 40 miles" },
    { key: 60, value: "up to 60 miles" },
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
    // setIsLoading(true)
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

  return (
    <SafeAreaView>
      <SafeAreaView>
        <SegmentedButtons
          value={selectedTab}
          onValueChange={setSelectedTab}
          buttons={[
            {
              value: "festival",
              label: "Festival",
            },
            {
              value: "artist",
              label: "Artist",
            },
            { value: "location", label: "Location" },
          ]}
        />
      </SafeAreaView>
      <SafeAreaView>
        {selectedTab !== "location" ? (
          <TextInput
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
          />
        )}
        <FestivalList
          festivalResult={festivalResult}
          setFestivalResult={setFestivalResult}
          error={error}
        />
        
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 3,
    padding: 10,
    margin: 20,
  },
});

export default SearchScreen;
