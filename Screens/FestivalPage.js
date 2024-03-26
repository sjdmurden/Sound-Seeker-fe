import { ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";

function FestivalPage({ route }) {
  const festival = route.params.selectedFestival;

  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Card.Cover src={festival.xlargeimageurl} />
          <Text variant="titleLarge">{festival.eventname}</Text>
          <Text variant="bodyMedium">{festival.venue.address}</Text>
          <Text variant="bodyMedium">{festival.startdate}</Text>
          <Text variant="bodyMedium">
            #{festival.genres[0].name}, #{festival.genres[1].name},{" "}
            #{festival.genres[2].name}
          </Text>
          <Text variant="titleMedium">Line Up</Text>
          {festival.artists.map((artist) => {
            return <Text key={artist.id} variant="bodyMedium">{artist.name}</Text>;
          })}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

export default FestivalPage;
