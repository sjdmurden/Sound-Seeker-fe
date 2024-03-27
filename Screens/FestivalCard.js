import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const FestivalCard = ({ festival }) => {
  const navigation = useNavigation();
  
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
        </Card.Content>
        <Card.Cover src={festival.xlargeimageurl} />
        <Card.Actions></Card.Actions>
      </Card>
    </Button>
  );
};

export default FestivalCard;
