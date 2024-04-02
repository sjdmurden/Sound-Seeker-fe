import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Compatibility } from "./Compatibility";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";

const FestivalCard = ({ festival, festivalIndex, setFestivalResult, location }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          navigation.navigate("FestivalPage", { selectedFestival: festival }, {location:location});
        }}
      >
        <Card style={styles.card}>
          <View style={styles.container}>
            <Card.Cover src={festival.xlargeimageurl} />
          </View>
          <View>
            <Text variant="titleLarge">{festival.eventname}</Text>
            <Text variant="bodyMedium">{festival.venue.address}</Text>
            <Text variant="bodyMedium">{festival.startdate}</Text>
            <Compatibility
              festival={festival}
              festivalIndex={festivalIndex}
              setFestivalResult={setFestivalResult}
            />
          </View>
          
          <Card.Actions></Card.Actions>
        </Card>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    marginBottom:15,
    flexDirection: "row",
    gap: 10
  },
  card: {
    backgroundColor: "green",
    
  },
  title: {
    fontSize: 40,
    color: "#1d8597",
    paddingLeft: 20,
    paddingTop: 30,
    fontFamily: "Lobster_400Regular" 
  }
})

export default FestivalCard;
