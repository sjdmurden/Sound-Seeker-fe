import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

function FestivalPage({ route }) {
  const festival = route.params.selectedFestival;
  const { latitude, longitude } = festival.venue;

  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Card.Cover src={festival.xlargeimageurl} />
          <Text variant="titleLarge">{festival.eventname}</Text>
          <Text variant="bodyMedium">{festival.startdate.slice(0,10)}</Text>
          <Text variant="bodyMedium">{festival.venue.address}</Text>

          <View style={styles.container}>
            <StatusBar style="auto" />
          </View>

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

          <Text variant="titleMedium">Line Up</Text>

          {festival.artists.map((artist) => {
            return (
              <Text key={artist.artistid} variant="bodyMedium">
                {artist.name}
              </Text>
            );
          })}

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
  genres: {
    color: "blue",
  },
  lineup:{
    
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 200,
    marginBottom: 50,
  },
});

export default FestivalPage;
