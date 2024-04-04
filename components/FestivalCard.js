import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";

const FestivalCard = ({ festival, location }) => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
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
      <LinearGradient colors={["#faf8fc", "#dad8dc"]} style={styles.container}>
        <View >
          <Text
            style={{ fontWeight: "bold", margin: 2, marginTop: 5 }}
            variant="titleLarge"
          >
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
              {`${festival.startdate.slice(
                0,
                10
              )}  //  ${festival.enddate.slice(0, 10)}`}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginBottom: 5, marginLeft: 4 }}
          >
            {festival.genres &&
              festival.genres.slice(0, 3).map((genre) => {
                return (
                  <Text style={{ color: "#505050" }} variant="bodyLarge">
                    #{genre.name}
                    {"  "}
                  </Text>
                );
              })}
          </View>
          <View style={styles.containerAfterTitle}>
            <Card.Cover src={festival.xlargeimageurl} style={styles.image} />

            <View style={styles.textContainer}>
              <View style={{ marginTop: 12 }}>
                {festival.artists.length > 0 ? (
                  <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                    {" "}
                    Headliners
                  </Text>
                ) : (
                  <Text variant="titleLarge"> Line Up TBA</Text>
                )}

                {festival.artists &&
                  festival.artists.slice(0, 3).map((artist) => {
                    return (
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 20 }}> {`\u2022`}</Text>
                        <Text
                          key={artist.artistid}
                          variant="bodyLarge"
                          style={{ paddingLeft: 4, fontWeight: "semibold" }}
                        >
                          {artist.name}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 8,

            alignItems: "center",
            position: "fixed",
            bottom: "0",
            width: "106.4%",
            left: -10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: "#cf2c1f",
          }}
        >
          {fontsLoaded && (
            <Text style={styles.compatibility}>{festival.compatibility}</Text>
          )}
        </View>
      </LinearGradient>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "70",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowColor: "#17212b",
    shadowRadius: 5,
  },
  containerAfterTitle: {
    width: 310,
    flexDirection: "row",
    gap: 8,
    marginLeft: 3,
  },
  textContainer: {
    flex: 1,
    flexWrap: "wrap",
    margin: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  image: {
    height: 170,
    width: 150,
    paddingBottom: 3,
    paddingTop: 3,
  },
  compatibility: {
    color: "white",

    width: "100%",
    paddingVertical: 8,
    borderColor: "#cf2c1f",
    borderRadius: 20,
    textAlign: "center",
    marginTop: 7,
    marginBottom: 7,
    fontFamily: "Lobster_400Regular",
    fontSize: 30,
  },
});

export default FestivalCard;
