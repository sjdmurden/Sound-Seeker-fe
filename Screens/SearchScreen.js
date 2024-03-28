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

const SearchScreen = () => {
  const [festivalQuery, setFestivalQuery] = useState("");
  const [festivalResult, setFestivalResult] = useState("");
  const [value, setValue] = useState("festival");
  const [radius, setRadius] = useState("");
  const [location, setLocation] = useState();
  const [noResult, setNoResult] = useState("");
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
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  useEffect(() => {
    setNoResult("");
    setFestivalResult("");
  }, [value]);

  function handleFestivalSearch() {
    setIsLoading(true);
    if (value === "festival") {
      searchAllFestivals(festivalQuery).then((response) => {
        if (response.data.results.length > 0) {
          setFestivalResult(response.data.results);
          setIsLoading(false);
        } else {
          setFestivalResult([]);
          setIsLoading(false);
          setNoResult("Sorry, no festival matches your search");
        }
        setFestivalQuery("");
      });
    }
    if (value === "artist") {
      getArtistId(festivalQuery)
        .then((response) => {
          const artistId = response.data.results[0].id;
          getFestivalByArtist(artistId).then((response) => {
            if (response.data.results.length === 0) {
              setNoResult(
                "Sorry, the artist is not currently playing any festivals"
              );
              setIsLoading(false);
            } else {
              setNoResult("");
              setFestivalResult(response.data.results);
              setIsLoading(false);
            }
          });
          setFestivalQuery("");
        })
        .catch((err) => {
          setIsLoading(false);
          setNoResult("Sorry, no artist matches your search");
        });
      setFestivalQuery("");
    }
    if (value === "location") {
      setNoResult(false);
      getFestivalByLocation(location, radius).then((response) => {
        setFestivalResult(response.data.results);
        if (response.data.results.length > 0) {
          setFestivalResult(response.data.results);
          setIsLoading(false);
        } else {
          setFestivalResult([]);
          setIsLoading(false);
          setNoResult("Sorry, there are no festivals within this distance");
        }
        setFestivalQuery("");
      });
    }
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <SafeAreaView>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
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
        {value !== "location" ? (
          <TextInput
            placeholder="Search..."
            value={festivalQuery}
            onChangeText={setFestivalQuery}
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
        {!noResult ? (
          <ScrollView>
            {Object.keys(festivalResult).length > 0 &&
              festivalResult.map((festival) => {
                return <FestivalList key={festival.id} festival={festival} />;
              })}
          </ScrollView>
        ) : (
          <Text>{noResult}</Text>
        )}
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
