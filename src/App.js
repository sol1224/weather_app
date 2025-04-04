import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDroplet,
  faLocationDot,
  faPlus,
  faSmog,
  faTemperatureQuarter,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faMoon } from "@fortawesome/free-regular-svg-icons";

// 1. 현재 위치의 날씨가 UI와 함께 나와야 한다
// 2. 사이트 입장시 현재 위치의 날씨가 보여야 한다.
// 3. 다른 도시 버튼들을 클릭하면 다른 도시 날씨가 나와야 한다.
// 4. 유저가 클릭한 도시 버튼이 표시가 되어야 한다.
// 5. 다시 current location 버튼을 누르면 다시 현재 위치의 날씨를 볼 수 있다.
// 6. 도시간 이동시 로딩스피너가 보여야 한다

//   ================================================================
// location Ko Mapping
const translationName = {
  Sŏul: "서울",
  Pusan: "부산",
  Taegu: "대구",
  Inchŏn: "인천",
  Daejeon: "대전",
  Busan: "부산",
  Kwangju: "광주",
  Ulsan: "울산",
  Jeju: "제주",
  Kapyŏng: "가평",
  Koyang: "고양",
  Kwachŏn: "과천",
  Kwangmyŏng: "광명",
  Kyeyang: "계양",
  Michuhol: "미추홀구",
  Namdong: "남동구",
  Gwangju: "광주",
  Yŏnsu: "연수구",
  Tong: "동구",
  Guri: "구리",
  Gunpo: "군포",
  Gimpo: "김포",
  Seongnam: "성남",
  Siheung: "시흥",
  Anyang: "안양",
  Hanam: "하남",
  Paju: "파주",
  Suwon: "수원",
  Bucheon: "부천",
};

const weatherDescKo = {
  201: "가벼운 비를 동반한 천둥구름",
  200: "비를 동반한 천둥구름",
  202: "폭우를 동반한 천둥구름",
  210: "약한 천둥구름",
  211: "천둥구름",
  212: "강한 천둥구름",
  221: "불규칙적 천둥구름",
  230: "약한 연무를 동반한 천둥구름",
  231: "연무를 동반한 천둥구름",
  232: "강한 안개비를 동반한 천둥구름",
  300: "가벼운 안개비",
  301: "안개비",
  302: "강한 안개비",
  310: "가벼운 적은비",
  311: "적은비",
  312: "강한 적은비",
  313: "소나기와 안개비",
  314: "강한 소나기와 안개비",
  321: "소나기",
  500: "악한 비",
  501: "중간 비",
  502: "강한 비",
  503: "매우 강한 비",
  504: "극심한 비",
  511: "우박",
  520: "약한 소나기 비",
  521: "소나기 비",
  522: "강한 소나기 비",
  531: "불규칙적 소나기 비",
  600: "가벼운 눈",
  601: "눈",
  602: "강한 눈",
  611: "진눈깨비",
  612: "소나기 진눈깨비",
  615: "약한 비와 눈",
  616: "비와 눈",
  620: "약한 소나기 눈",
  621: "소나기 눈",
  622: "강한 소나기 눈",
  701: "박무",
  711: "연기",
  721: "연무",
  731: "모래 먼지",
  741: "안개",
  751: "모래",
  761: "먼지",
  762: "화산재",
  771: "돌풍",
  781: "토네이도",
  800: "구름 한 점 없는 맑은 하늘",
  801: "약간의 구름이 낀 하늘",
  802: "드문드문 구름이 낀 하늘",
  803: "구름이 거의 없는 하늘",
  804: "구름으로 뒤덮인 흐린 하늘",
  900: "토네이도",
  901: "태풍",
  902: "허리케인",
  903: "한랭",
  904: "고온",
  905: "바람부는",
  906: "우박",
  951: "바람이 거의 없는",
  952: "약한 바람",
  953: "부드러운 바람",
  954: "중간 세기 바람",
  955: "신선한 바람",
  956: "센 바람",
  957: "돌풍에 가까운 센 바람",
  958: "돌풍",
  959: "심각한 돌풍",
  960: "폭풍",
  961: "강한 폭풍",
  962: "허리케인",
};
//
// Rainy : ID 200~599
// ID 200~299 : Thunderstorm (폭풍우)
// ID 300~399 : Drizzle (이슬비)
// ID 500~ 599 : Rain(비)

// Snowy : ID 600~699
// ID 600~699 : Snow (눈)

// Cloudy : ID 700~804
// ID 700~799 : mist(안개)
// ID 801~804 : Clouds (흐림)

// Sunny : ID 800
// ID 800 : Clear (맑음)

function App() {
  const OPEN_API_KEY = process.env.REACT_APP_OPEN_API_KEY;
  const [weather, setWeather] = useState("");

  // currentLocation value
  const getCurruntLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherCurrentLoaction(lat, lon);
    });
  };

  // const weatherImg
  const getWeatherImg = weatherId => {
    if (weatherId === 800) {
      return "images/sunny2.png";
    } else if (weatherId > 800 && weatherId < 803) {
      return "images/cloud2.png";
    } else if (weatherId >= 803 && weatherId <= 804) {
      return "images/clouds2.png";
    } else if (weatherId >= 700 && weatherId <= 799) {
      return "images/clouds2.png";
    } else if (weatherId >= 600 && weatherId < 700) {
      return "images/snow2.png";
    } else if (weatherId >= 200 && weatherId < 600) {
      return "images/rain2.png";
    } else {
      return "none";
    }
  };

  // current weather data open API
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  const getWeatherCurrentLoaction = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=d71a1d66cb9bfd628753e61d23238724`
        // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_API_KEY}&units=metric`
      );
      console.log("res!!!", res);
      const transLatedCityName =
        translationName[res.data.name] || res.data.name;

      const weatherId = res.data.weather[0].id;
      const weatherKo = weatherDescKo[weatherId];
      const temp = (res.data.main.temp - 273.15).toFixed(0);
      const temp_max = (res.data.main.temp_max - 273.15).toFixed(0);
      const temp_min = (res.data.main.temp_min - 273.15).toFixed(0);
      const humidity = res.data.main.humidity;
      const windSpeed = res.data.wind.speed;
      const sunrise = res.data.sys.sunrise;
      const sunset = res.data.sys.sunset;

      const getImg = getWeatherImg(weatherId);

      setWeather({
        decription: weatherKo,
        name: transLatedCityName,
        temp: temp,
        temp_max: temp_max,
        temp_min: temp_min,
        humidity: humidity, //습도
        windSpeed: windSpeed, //풍속
        sunrise: sunrise, //일출
        sunset: sunset, // 일몰
        getImg: getImg,
      });
    } catch (error) {
      error(error);
    }
  };

  const getCurrentTime = () => {
    // 현재 날짜와 시간을 가져오기
    const currentDate = new Date();

    // 각 구성 요소를 가져오기
    const year = currentDate.getFullYear().toString();
    const yearPart = year.slice(2, 4);
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = currentDate.getDate();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const week = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "",
    ];
    const dayOfWeek = week[currentDate.getDate()];
    const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";

    return [hours, minutes, dayOfWeek, ampm];
  };

  console.log("getCurrentTime!!!", getCurrentTime());

  useEffect(() => {
    getCurruntLocation();
  }, []);

  return (
    <div>
      <div className="container">
        {/* <section>
          <header className="header">
            <div>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="header-location-notice">
              <div className="icon-pd">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div>{weather.name}</div>
            </div>
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </header>
        </section> */}

        <section className="main">
          <div className="temp-location">
            <div className="header-location-notice">
              <div className="icon-pd">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div>{weather.name}</div>
            </div>
          </div>
          <div>
            <img className="weather-img" src={weather.getImg} alt="sunny"></img>
          </div>

          <div className="display-flex">
            <div>
              <div className="temp-area">{weather.temp}°</div>
              <div className="temp-max-min-des">
                MAX {weather.temp_max}° | MIN {weather.temp_min}°
              </div>
            </div>
            <div className="dec-style">
              <div className="temp-des">{weather.decription}</div>

              <div className="temp-des">{getCurrentTime()[2]}</div>
              <div>{`${getCurrentTime()[0]}:${getCurrentTime()[1]} ${
                getCurrentTime()[3]
              }`}</div>
            </div>
          </div>
        </section>
        <section className="sub-weather">
          <div className="sub-weather-box">
            <div>
              <FontAwesomeIcon size="2x" icon={faTemperatureQuarter} />
            </div>
            <div className="sub-weather-box-text">{weather.temp}°C</div>
            <div>온도</div>
          </div>
          <div className="sub-weather-box">
            <div c>
              <FontAwesomeIcon size="2x" icon={faSmog} />
            </div>
            <div className="sub-weather-box-text">좋음</div>
            <div>미세먼지</div>
          </div>
          <div className="sub-weather-box">
            <div>
              <FontAwesomeIcon size="2x" icon={faDroplet} />
            </div>
            <div className="sub-weather-box-text">{weather.humidity}%</div>
            <div>습도</div>
          </div>
          <div className="sub-weather-box border-none">
            <div>
              <FontAwesomeIcon size="2x" icon={faWind} />
            </div>
            <div className="sub-weather-box-text">{weather.humidity}m/s</div>
            <div>풍속</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
