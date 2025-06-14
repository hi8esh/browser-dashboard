const UNSPLASH_API_KEY = '471e8b58543a4fd11458dbc64525fb93c7a6a0e97e776db6747018dcf961aa9d';
const WEATHER_API_KEY = 'bb3abfbd0870985604b23cf158cf8a33';

const coins = [
  'bitcoin', 'ethereum', 'ripple', 'cardano', 'solana', 'dogecoin',
  'litecoin', 'polkadot', 'chainlink', 'uniswap', 'avalanche-2',
  'cosmos', 'stellar', 'algorand', 'vechain', 'filecoin', 'tron',
  'monero', 'bitcoin-cash', 'tezos'
];

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1483206048520-2321c1a5fb36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
const DEFAULT_AUTHOR = 'Kendal';
const WEATHER_UPDATE_INTERVAL = 10 * 60 * 1000; // 10 minutes
const COINS_UPDATE_INTERVAL = 100 * 1000; // 100 seconds
const COIN_DISPLAY_INTERVAL = 5000; // 5 seconds

async function setBackgroundImage() {
  try {
    const res = await fetch('https://api.unsplash.com/photos/random?orientation=landscape&query=nature', {
      headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` }
    });
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  } catch (error) {
    document.body.style.backgroundImage = `url(${DEFAULT_IMAGE})`;
    document.getElementById("author").textContent = `By: ${DEFAULT_AUTHOR}`;
    console.error('Error fetching image:', error);
  }
}

async function fetchAndStoreCoinsData() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(',')}`);
    if (!res.ok) throw new Error('Failed to fetch coins');
    const coinsData = await res.json();
    localStorage.setItem('allCoins', JSON.stringify(coinsData));
  } catch (error) {
    console.error('Error fetching coins data:', error);
  }
}

function displayRandomCoin() {
  const allCoins = JSON.parse(localStorage.getItem('allCoins')) || [];

  if (allCoins.length === 0) {
    document.getElementById("crypto-top").innerHTML = `
      <img src="https://via.placeholder.com/40" alt="Unknown Coin" />
      <span>Unknown Coin</span>
    `;
    document.getElementById("crypto-details").innerHTML = `
      <p>🎯: $0.00</p>
      <p>👆: $0.00</p>
      <p>👇: $0.00</p>
    `;
    console.error('No coins data available');
    return;
  }

  const coin = allCoins[Math.floor(Math.random() * allCoins.length)];

  document.getElementById("crypto-top").innerHTML = `
    <img src="${coin.image}" alt="${coin.name}" />
    <span>${coin.name}</span>
  `;
  document.getElementById("crypto-details").innerHTML = `
    <p>🎯: $${coin.current_price.toFixed(2)}</p>
    <p>👆: $${coin.high_24h.toFixed(2)}</p>
    <p>👇: $${coin.low_24h.toFixed(2)}</p>
  `;
}

function updateTime() {
  const timeEl = document.getElementById('time');
  setInterval(() => {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }, 1000);
}

async function fetchWeather() {
  const weatherEl = document.getElementById('weather');

  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
    );

    const { latitude, longitude } = position.coords;
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
    );

    if (!weatherRes.ok) throw new Error('Failed to fetch weather');

    const data = await weatherRes.json();
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherEl.innerHTML = `
      <h3>
        <img src="${iconUrl}" alt="${data.weather[0].description}" 
             style="vertical-align: middle; width: 30px; height: 30px; margin-right: 8px;" />
        ${data.name}
      </h3>
      <p>${data.weather[0].main} (${data.weather[0].description})</p>
      <p>🌡️ ${data.main.temp.toFixed(1)}°C</p>
      <p>💨 ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherEl.textContent = 'Unable to fetch weather.';
    console.error('Weather error:', error);
  }
}

function showCryptoLoading() {
  document.getElementById("crypto-top").innerHTML = `Loading crypto data <span class="loading-spinner"></span>`;
  document.getElementById("crypto-details").innerHTML = '';
}

function showWeatherLoading() {
  document.getElementById("weather").innerHTML = `Loading weather data <span class="loading-spinner"></span>`;
}

function showTimeLoading() {
  document.getElementById('time').textContent = 'Loading time...';
}

function showAuthorLoading() {
  document.getElementById('author').textContent = 'Loading background info...';
}


async function init() {
  showCryptoLoading();
  showWeatherLoading();
  showTimeLoading();
  showAuthorLoading();

  await setBackgroundImage();
  await fetchAndStoreCoinsData();
  displayRandomCoin();
  updateTime();
  fetchWeather();

  setInterval(fetchAndStoreCoinsData, 100000); // Refresh coins every 100 seconds
  setInterval(displayRandomCoin, 5000);        // Update coin display every 5 seconds
}


init();
