import Loading from "./Loading";
import { ScrollView } from "react-native";
import FestivalCard from "./FestivalCard";
import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { compatibilityCalculator } from "../utils/compatibilityCalculator";

const FestivalList = ({
  festivalResult,
  setFestivalResult,
  isLoading,
  setIsLoading,
  location,
  isFound,
}) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (isFound) {
      compatibilityCalculator(festivalResult, loggedInUser).then(
        (newFestivalResult) => {
          newFestivalResult.sort((previous, current) => {
            let previousCompatibilityValue = previous.compatibility;
            let currentCompatibilityValue = current.compatibility;
            if (
              currentCompatibilityValue === "Unable to calculate compatibility"
            ) {
              currentCompatibilityValue = -2;
            } else if (currentCompatibilityValue === "Lineup TBA") {
              currentCompatibilityValue = -1;
            } else {
              currentCompatibilityValue = Number(
                currentCompatibilityValue.match(/\d+/)[0]
              );
            }
            if (
              previousCompatibilityValue === "Unable to calculate compatibility"
            ) {
              previousCompatibilityValue = -2;
            } else if (previousCompatibilityValue === "Lineup TBA") {
              previousCompatibilityValue = -1;
            } else {
              previousCompatibilityValue = Number(
                previousCompatibilityValue.match(/\d+/)[0]
              );
            }
            return currentCompatibilityValue - previousCompatibilityValue;
          });
          //is messing up error handling
          setFestivalResult(() => {
            setIsLoading(false);

            return newFestivalResult;
          });
        }
      );
    }
  }, [isFound]);

  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView style={{ height: "60%", margin: 10 }}>
      {festivalResult.map((festival) => {
        return (
          <FestivalCard
            key={festival.id}
            festival={festival}
            location={location}
          />
        );
      })}
    </ScrollView>
  );
};

export default FestivalList;
