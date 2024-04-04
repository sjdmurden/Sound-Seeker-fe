import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import * as d3 from "d3";
import Svg, { Path, G } from "react-native-svg";
import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { getArtistsInfo } from "../api";

const customColours = [
  "#002054",
  "#006E97",
  "#00899D",
  "#55B0A5",
  "#FED8A6",
  "#FFA65B",
  "#FF5D00",
  "#FF0000",
];

const PieChart = ({ festival }) => {
  const { width, height } = Dimensions.get("window");
  const radius = Math.min(width, height) / 2;
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const artistsId = festival.artists
        .filter((artist) => artist.spotifyartisturl)
        .map((artist) => {
          const splitUrl = artist.spotifyartisturl.split(":");
          return splitUrl[splitUrl.length - 1];
        });

      const genres = await getArtistsInfo(artistsId, loggedInUser);
      const allGenres = genres.flat();
      const genreCounts = {};
      allGenres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
      const genreCountsArray = Object.keys(genreCounts).map((genre) => ({
        genre,
        count: genreCounts[genre],
      }));

      genreCountsArray.sort((a, b) => b.count - a.count);
      const topGenres = genreCountsArray.slice(0, 8);
      setTopGenres(topGenres);
    };

    getGenres();
  }, [festival]);

  const color = d3
    .scaleOrdinal()
    .domain(topGenres.map((d) => d.genre))
    .range(customColours);

  const pie = d3
    .pie()
    .value((d) => d.count)
    .sort(null);

  const arcs = pie(topGenres);

  const arcGenerator = d3.arc().innerRadius(0).outerRadius(100);

  return (
    <View>
      <Text style={styles.title}>Festival Genres</Text>
    <View style={styles.container}>
      <View style={styles.pieChart}>
        <Svg width={width} height={height}>
          <G transform={`translate(${width / 2},${height / 3})`}>
            {arcs.map((arc, index) => (
              <Path
                key={index}
                d={arcGenerator(arc)}
                fill={color(topGenres[index].genre)}
              />
            ))}
          </G>
        </Svg>
      </View>
      <View style={styles.labelList}>
        {topGenres.map((genre, index) => (
          <Text
            key={index}
            style={[styles.labels, { color: color(topGenres[index].genre) }]}
          >
            {genre.genre}
          </Text>
        ))}
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: -60,
  },
  pieChart: {
    marginTop: -80,
    marginBottom: -400,
    marginLeft: -100,
    marginRight: -40,
    width: '100%',
  },
  labels: {
    fontSize: 14,
    marginVertical: 5,
  },
  labelList: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 40,
    marginBottom: 30,
  },
});

export default PieChart;
