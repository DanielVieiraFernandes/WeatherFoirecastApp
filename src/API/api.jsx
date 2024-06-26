const apiKey =
  "https://api.hgbrasil.com/weather?key=2e1c0ed7&city_name=Hortolândia,SP";

export const FetchApiWeather = async () => {
  try {
    const apiUrl = `${apiKey}`;
    const response = await fetch(apiUrl);
    const apiData = await response.json();
    return apiData.results;
  } catch (error) {
    console.log("erro na requisição de dados");
    return null;
  }
};
