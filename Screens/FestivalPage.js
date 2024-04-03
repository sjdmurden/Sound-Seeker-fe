import {
  ScrollView,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  FlatList,
  Image,
  LogBox,
} from "react-native";
import { Card, Text } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import PieChart from "../components/Graphs";

function FestivalPage({ route }) {
  const festival = route.params.selectedFestival;
  const { latitude, longitude } = festival.venue;

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleArtistPress = (spotifyUrl) => {
    Linking.openURL(spotifyUrl);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artistContainer}
      onPress={() => handleArtistPress(item.spotifyartisturl)}
    >
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <Text style={styles.artistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <Card style={{ backgroundColor: "#faf8fc" }}>
        <Card.Content style={styles.card}>
          <Card.Cover src={festival.xlargeimageurl} />
          <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
            {festival.eventname}
          </Text>
          <Text variant="titleMedium" style={styles.details}>
            {festival.description}
          </Text>
          <Text variant="bodyMedium" style={styles.details}>
            <FontAwesomeIcon icon={faCalendarDays} /> {""}
            {festival.startdate.slice(0, 10)} {""} //{" "}
            {festival.enddate.slice(0, 10)}
          </Text>
          <Text variant="bodyMedium" style={styles.details}>
            <FontAwesomeIcon icon={faLocationDot} /> {""}
            {festival.venue.address}, {festival.venue.postcode}
          </Text>
          <Text>{festival.compatibility}</Text>
          <View style={styles.genresContainer}>
            {festival.genres &&
              festival.genres.slice(0, 5).map((genre) => {
                return (
                  <Text
                    style={styles.genres}
                    key={genre.genreid}
                    variant="bodyMedium"
                  >
                    #{genre.name}
                  </Text>
                );
              })}
          </View>
          <View style={styles.lineup}>
            {festival.artists.length > 0 ? (
              <Text
                variant="titleLarge"
                style={{ marginBottom: 10, fontWeight: "bold" }}
              >
                Line Up
              </Text>
            ) : (
              <Text
                variant="titleLarge"
                style={{ marginBottom: 10, fontWeight: "bold" }}
              >
                Line Up TBA
              </Text>
            )}
            <FlatList
              data={festival.artists}
              renderItem={renderItem}
              keyExtractor={(item) => item.artistid.toString()}
              numColumns={3}
            />
          </View>
          <PieChart festival={festival}/>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title={festival.eventname}
              description={festival.venue.address}
            />
          </MapView>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  details: {
    margin: 5,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
  },
  genres: {
    marginRight: 10,
    color: "#194485",
  },
  lineup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 400,
    marginBottom: 50,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 15,
  },
  artistContainer: {
    width: "33.33%",
    alignItems: "center",
    marginBottom: 15,
  },
  artistImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  artistName: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});

export default FestivalPage;
