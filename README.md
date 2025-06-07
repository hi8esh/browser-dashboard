# 🌐 Live Dashboard - Crypto, Weather, Time & Background

A sleek, responsive real-time dashboard showing:

- 💰 Random cryptocurrency stats  
- ⛅ Live weather based on your location  
- 🕒 Current time (auto-updating)  
- 🌄 A beautiful, random background image from Unsplash

Built using **HTML, CSS, and JavaScript** with integration to third-party APIs.

---

## 🎥 Demo

🔗 [Check out the Live Site](https://browser-dashboard.netlify.app/)

---

## 🚀 Features

- 🔄 Random crypto info updated every 5 seconds  
- 🌤️ Weather pulled using Geolocation + OpenWeatherMap  
- ⏰ Live digital clock (HH:MM:SS)  
- 🖼️ Dynamic background from Unsplash  
- 💾 Efficient use of `localStorage` for coin data  
- 📱 Responsive for mobile & desktop  

---

## 🛠️ Tech Stack

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- [CoinGecko API](https://www.coingecko.com/en/api) 🪙  
- [OpenWeatherMap API](https://openweathermap.org/api) ☁️  
- [Unsplash API](https://unsplash.com/developers) 📷  

---

## 🔧 Setup Instructions

### 1. Clone this repo

```bash
git clone https://github.com/yourusername/live-dashboard.git
cd live-dashboard
```
### 2. Add your API keys
Open the `script.js` file and replace the placeholder keys with your own API keys:
```js
const UNSPLASH_API_KEY = 'your_unsplash_api_key';
const WEATHER_API_KEY = 'your_openweather_api_key';
```
> 🔐 You can get free API keys from:
>
> - [Unsplash Developer Portal](https://unsplash.com/developers)
> - [OpenWeatherMap API](https://openweathermap.org/api)

### 3. Open in browser

You can just open `index.html` in your browser!

Or use a local server:

```bash
# If using VS Code Live Server extension
Right-click index.html > Open with Live Server
```
---

## 🧠 How It Works

| Feature       | Description                                                       |
|---------------|-------------------------------------------------------------------|
| ⛅ Weather     | Gets current weather via `navigator.geolocation` and OpenWeatherMap API |
| 💰 Crypto     | Randomly picks and displays a coin every 5 seconds using CoinGecko API  |
| 🌅 Background | Fetches a random landscape image from Unsplash API                    |
| 🕒 Clock      | Uses `setInterval` to update every second                            |

---

## 📱 Responsive Design

Responsive for all screen sizes:

- Desktop 💻  
- Tablet 📱  
- Mobile 📲  

---

## 📄 License

MIT License © 2025 [Your Name Here]

---

## 🙌 Acknowledgements

- [Unsplash](https://unsplash.com/)  
- [CoinGecko](https://www.coingecko.com/)  
- [OpenWeatherMap](https://openweathermap.org/)  

---

## 💬 Feedback

Have ideas or found bugs?  
Open an issue or reach out – contributions welcome! ✨
