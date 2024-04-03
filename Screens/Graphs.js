import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import * as d3 from "d3";
import Svg, { Path, G } from "react-native-svg";
import { useContext } from "react";
import { UserContext } from "../Contexts/user";
import { getArtistsInfo } from "../api";

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
  console.log(topGenres);
  const color = d3
    .scaleOrdinal()
    .domain(topGenres.map((d) => d.genre))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), topGenres.length).reverse())

  const pie = d3
    .pie()
    .value((d) => d.count)
    .sort(null);

  const arcs = pie(topGenres);

  const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  return (
    <View>
      <Svg width={width} height={height}>
        <G transform={`translate(${width / 2},${height / 2})`}>
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
  );
};

export default PieChart;
