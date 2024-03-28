import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Compatibility } from "./Compatibility";
import { SafeAreaView } from "react-native";

const FestivalList = ({ festival }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
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
          <Compatibility
            festival={festival}
          />
        </Card.Content>
        <Card.Cover src={festival.xlargeimageurl} />
        <Card.Actions></Card.Actions>
      </Card>
    </Button>

    </SafeAreaView>
  );
};

export default FestivalList;
