import * as React from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native-web";

const Loading = () => <ActivityIndicator animating={true} size={"large"} style={styles.loading}/>;

const styles = StyleSheet.create({
  loading: {
    padding: 10,
    margin: 20,
  },
});

export default Loading;
