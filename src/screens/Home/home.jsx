import React from "react";
import { View, StyleSheet } from "react-native";
import WeatherInfo from "../../components/weatherInfo";
import NextForecasts from "../../components/nextForecast";
export default function Home() {
  return (
    <View style={styles.container}>
      <WeatherInfo />
      <NextForecasts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0926',
    elevation: 2
  },
});
