import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const FestivalCard = ({ festival, location }) => {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => {
        navigation.navigate(
          "FestivalPage",
          { selectedFestival: festival },
          { location: location }
        );
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", margin: 2 }} variant="titleLarge">
          {festival.eventname}
        </Text>
        <View
          style={{
            margin: 4,
            marginLeft: 4,
            marginBottom: 6,
          }}
        >
          <Text variant="bodyMedium">
            <FontAwesomeIcon icon={faCalendarDays} /> {""}
            {festival.startdate.slice(0, 10)} {""} //{" "}
            {festival.enddate.slice(0, 10)}
          </Text>
        </View>
        <View style={styles.containerAfterTitle}>
          <Card.Cover src={festival.xlargeimageurl} style={styles.image} />

          <View style={styles.textContainer}>
            <View style={{ marginTop: 2 }}>
              {festival.artists.length > 0 ? (
                <Text variant="titleLarge"> Headliners</Text>
              ) : (
                <Text variant="titleLarge"> Line Up TBA</Text>
              )}

              {festival.artists &&
                festival.artists.slice(0, 3).map((artist) => {
                  return (
                    <View style={{ flexDirection: "row" }}>
                      <Text> {"."}</Text>
                      <Text
                        key={artist.artistid}
                        variant="bodyLarge"
                        style={{ paddingLeft: 4 }}
                      >
                        {artist.name}
                      </Text>
                    </View>
                  );
                })}
            </View>
            <View style={{ marginTop: 10 }}>
              {festival.genres &&
                festival.genres.slice(0, 3).map((genre) => {
                  return (
                    <View style={{ flexDirection: "row" }} key={genre.genreid}>
                      <Text style={{ color: "#194485" }}> {"#"}</Text>
                      <Text
                        style={{ color: "#194485", paddingLeft: 5 }}
                        variant="bodyLarge"
                      >
                        {genre.name}
                      </Text>
                    </View>
                  );
                })}
            </View>
            <Text>{festival.compatibility}</Text>
          </View>
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100",
    padding: 10,
    borderRadius: 15,
    margin: "auto",
    marginBottom: 15,
    backgroundColor: "#faf8fc",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowColor: "#17212b",
    shadowRadius: 5,
  },
  containerAfterTitle: {
    width: 310,
    flexDirection: "row",
    gap: 5,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    flexWrap: "wrap",
    margin: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 150,
    paddingBottom: 3,
    paddingTop: 3,
  },
  genres: {
    color: "#092651",
  },
});

export default FestivalCard;
