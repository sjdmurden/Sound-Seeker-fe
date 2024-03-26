import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput, Text, ScrollView } from "react-native";
import { searchAllFestivals, getArtistId, getFestivalByArtist } from "../api";
import FestivalCard from "./FestivalCard";
import { SegmentedButtons } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

const SearchScreen = () => {
  const [festivalQuery, setFestivalQuery] = useState("");
  const [festivalResult, setFestivalResult] = useState("");
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");

  const data = [
    { key: 20, value: "up to 20 miles" },
    { key: "40", value: "up to 40 miles" },
    { key: "60", value: "up to 60 miles" },
    { key: "80", value: "up to 80 miles" },
    { key: "100", value: "up to 100 miles" },
    { key: "GB", value: "Countrywide" },
  ];


  function handleFestivalSearch() {
    if (value === "festival") {
      searchAllFestivals(festivalQuery).then((response) => {
        if (response.data.results.length > 0) {
          setFestivalResult(response.data.results);
        } else {
          setFestivalResult("No festival found");
        }
        setFestivalQuery("");
      });
    }
    if (value === "artist") {
      getArtistId(festivalQuery).then((response) => {
        const artistId = response.data.results[0].id;
        if (artistId) {
          getFestivalByArtist(artistId).then((response) => {
            setFestivalResult(response.data.results);
          });
        } else {
          setFestivalResult("No festival found");
        }
        setFestivalQuery("");
      });
    }
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
            setSelected={(key) => setSelected(key)}
            data={data}
            save="key"
          />
        )}
        <ScrollView>
          {Object.keys(festivalResult).length > 0 &&
            festivalResult.map((festival) => {
              return <FestivalCard key={festival.id} festival={festival} />;
            })}
        </ScrollView>
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
