import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { FetchApiWeather } from "../API/api";
import { SvgUri } from "react-native-svg";
export default function NextForecasts() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchApiWeather();
        setApiData(data);
      } catch (error) {
        console.log("Erro na requisição");
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerScroll}>
        {apiData ? (
          apiData.forecast.map((forecastItem, index) => (
            <View key={index} style={styles.forecastItem}>
             
              <Text style={styles.descriptionText}>
                {forecastItem.description}
              </Text>
              <View style={styles.svgContainer}>
              <Text style={styles.dateText}>{forecastItem.date}</Text>
              <SvgUri
                width="100"
                height="100"
                uri={`https://assets.hgbrasil.com/weather/icons/conditions/${forecastItem.condition}.svg`}
              />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>Carregando...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    flex: 1,
  },
  forecastItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#2a2272',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tempText: {
    
  },
  descriptionText: {
    fontSize: 20,
    color: "#ffffff",
  },
  loadingText: {
    fontSize: 16,
    color: "#fff",
  },
  svgContainer:{
    alignItems:"center"
  }
});
