import * as React from "react";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput, Text } from "react-native";
import searchAllFestivals from "../api";
import FestivalCard from "./FestivalCard";

const SearchScreen = () => {
  const [festivalQuery, setFestivalQuery] = useState("");
  const [festivalResult, setFestivalResult] = useState("");

  function handleFestivalSearch() {
   searchAllFestivals(searchQuery).then((response) => {
    if (response.data.results.length > 0) {
      setFestivalResult(response.data.results);
    } else {
      setFestivalResult("No festival found");
    }
    setSearchQuery("");
  });
  }

  return (
    <SafeAreaView>
      <Text> search by festival name</Text>
      <TextInput
        placeholder="Search..."
        value={festivalQuery}
        onChangeText={setFestivalQuery}
        onSubmitEditing={handleFestivalSearch}
        style={styles.searchBox}
      />
      {Object.keys(festivalResult).length > 0 && festivalResult.map((festival) => {

          return (
            <FestivalCard festival={festival}/>
          );
        })}
        <Text> search by band name</Text>
         <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBox}
      />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  searchBox: {
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 3,
  }
})

export default SearchScreen;
