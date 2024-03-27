import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Compatibility } from "../Compatibility";

const FestivalList = ({ festival, showCompatibility }) => {
  const navigation = useNavigation();
  console.log('in fest list');
  return (
    <Button
      onPress={() => {
        navigation.navigate("FestivalPage", { selectedFestival: festival });
      }}
    >
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{festival.eventname}</Text>
          <Text variant="bodyMedium">{festival.venue.address}</Text>
          <Text variant="bodyMedium">{festival.startdate}</Text>
          <Compatibility festival={festival} showCompatibility={showCompatibility}/>
        </Card.Content>
        <Card.Cover src={festival.xlargeimageurl} />
        <Card.Actions></Card.Actions>
      </Card>
    </Button>
  );
};

export default FestivalList;
