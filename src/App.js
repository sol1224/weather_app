@font-face {
  font-family: "GmarketSansMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Gyeonggi_Title_Medium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2410-3@1.0/Title_Medium.woff")
    format("woff");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "GyeonggiTitleLight";
  src: url("https://cdn.jsdelivr.net/gh/wizfile/font/GyeonggiTitleLight.eot");
  src: url("https://cdn.jsdelivr.net/gh/wizfile/font/GyeonggiTitleLight.woff")
    format("woff");
  font-style: normal;
}

* {
  /* color: white; */
  font-family: GyeonggiTitleLight;
}

body {
  margin: 0;
}

.body {
  margin-top: 20px;
}

.main {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 80%;
  border-radius: 16px;
  /* justify-content: center; */
  /* padding: 50px 0; */
  font-size: 30px;
  align-items: center;
  padding: 30px 0;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 14px 28px rgba(100, 100, 100, 0.25),
    0 10px 10px rgba(63, 63, 63, 0.22);
}

.container {
  align-content: center;
  width: 800px;
  /* background-color: rgb(39, 151, 255); */
  background-image: url("/public/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0 auto;
}

.header {
  font-size: 22px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

.display-flex {
  width: 74%;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  padding-top: 42px;
  padding-bottom: 32px;
}
.temp-area {
  font-family: GyeonggiTitleLight;
  font-size: 120px;
}

.dec-style {
  text-align: end;
  align-content: center;
}

.header-location-notice {
  display: flex;
  flex-direction: row;
}

.icon-pd {
  padding-right: 6px;
}

.temp-max-min-des {
  font-size: 24px;
}

.weather-img {
  width: 180px;
  height: 180px;
  padding-top: 40px;
}

.fa-2x {
  font-size: 1.5em;
}

.sub-weather {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  background-color: rgba(146, 202, 255, 0);
  border-radius: 10px;
  padding-top: 40px;
}

.temp-location {
  display: flex;
  justify-content: space-between;
}

.temp-location-text {
  color: rgba(146, 202, 255, 0.9);
  font-size: 24px;
}

.sub-weather-box {
  font-size: 20px;
  padding: 10px 0;
  text-align: center;
  width: 200px;
  border-right: 1px solid rgba(146, 202, 255, 0.3);
}

.sub-weather-box-text {
  margin: 8px 0;
}

.border-none {
  border-right: none;
}

.temp-des {
  padding: 2px 0;
  font-size: 22px;
}

/* 세로모드 모바일 디바이스 ( 해상도가 576px 보다 작은 화면 ) */
@media screen and (max-width: 576px) {
  .container {
    width: 100%;
    height: 100vh;
  }
  .header {
    font-size: 14px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .temp-area {
    font-size: 48px;
  }
  .temp-location {
    display: flex;
    flex-direction: row;
    font-size: 16px;
  }

  .temp-des {
    text-align: right;
    padding-top: 16px;
  }
  .main {
    width: 80%;
    padding: 0;
  }
  .header-location-notice {
    display: none;
  }
  .display-flex {
    padding-top: 0;
  }

  .weather-img {
    width: 150px;
    height: 150px;
    padding-top: 32px;
    padding-bottom: 18px;
  }

  .temp-location-text {
    color: rgba(146, 202, 255, 0.9);
    font-size: 16px;
  }

  .sub-weather-box {
    font-size: 18px;
    text-align: center;
    margin: 0 auto;
  }
}

/* 세로모드 모바일 디바이스 ( 해상도가 576px 보다 작은 화면 ) */
@media screen and (max-width: 991px) {
  .container {
    width: 100%;
    height: 100vh;
  }
  .header {
    font-size: 18px;
    padding: 24px;
    display: flex;
    justify-content: space-between;
  }
  .temp-area {
    font-size: 90px;
  }
  .temp-des {
    font-size: 18px;
  }
}
