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
          {festival.genres &&
            festival.genres.slice(0, 3).map((genre) => {
              return <Text  key={genre.genreid} variant="bodyMedium">#{genre.name}</Text>;
            })}

          <Text variant="titleMedium">Line Up</Text>

          {festival.artists.map((artist) => {
            return (
              <Text key={artist.artistid} variant="bodyMedium">
                {artist.name}
              </Text>
            );
          })}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

export default FestivalPage;
