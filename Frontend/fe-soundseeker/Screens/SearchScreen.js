import * as React from "react";
import { Searchbar } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [festivalResult, setFestivalResult] = useState("");
  console.log("our search: ", searchQuery);

  function searchAllFestivals(festival_name) {
    return axios
      .get(
        `https://www.skiddle.com/api/v1/events?api_key=638e2af9d6545b37c5bf2afbed3261cc&eventcode=FEST&keyword=${festival_name}&description=1`
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          setFestivalResult(response.data.results);
        } else {
          setFestivalResult("No festival found");
        }
        setSearchQuery("");
      });
  }
  function handleSearch() {
   searchAllFestivals(searchQuery)
  }

  return (
    <SafeAreaView>
      
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      {Object.keys(festivalResult).length > 0 && festivalResult.map((festival) => {

          return (
            <SafeAreaView key={festival.id}>
              <Text>{festival.eventname}</Text>
            </SafeAreaView>
          );
        })}
    </SafeAreaView>
  );
};

export default SearchScreen;
