import React, { useEffect, useState, useCallback } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FetchApiWeather } from "../API/api";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  Roboto_400Regular,
  Roboto_900Black_Italic,
  Roboto_500Medium,
  Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { SvgUri } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";


SplashScreen.preventAutoHideAsync();

export default function WeatherInfo() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          Roboto_400Regular,
          Roboto_500Medium,
          Roboto_900Black_Italic,
          Roboto_700Bold
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    const fetchData = async () => {
      try {
        const data = await FetchApiWeather();
        setApiData(data);
      } catch (error) {
        console.log("Erro na requisição");
      }
    };

    prepare();
    fetchData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !apiData) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#11ACFF","#0649f1" ]}
      style={styles.container}
    >
      <View style={styles.containTemp} onLayout={onLayoutRootView}>
        <View style={styles.containerCityName}><Text style={styles.nameCity}>{apiData?.city}</Text></View>
        <View style={styles.svgContainer}>
          <SvgUri
            width="250"
            height="250"
            uri={`https://assets.hgbrasil.com/weather/icons/conditions/${apiData?.condition_slug}.svg`}
            style={styles.svg}
          />
        </View>
        <Text style={styles.textTemp}>{apiData?.temp ?? "Carregando..."}°</Text>
        <Text style={styles.textSlug}>{apiData?.description ?? "Carregando..."}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containTemp: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 10
  },
  svgContainer: {
    marginBottom: -40,
  },
  textTemp: {
    color: "#ffffff",
    fontSize: 50,
    fontFamily: "Roboto_400Regular",
  },
  textCity: {
    fontSize: 45,
  },
  nameCity:{
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: '#fff'
  },
  textSlug:{
    color: '#FAFD74',
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
  },
  containerCityName:{
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    margin: 30
  }

});
