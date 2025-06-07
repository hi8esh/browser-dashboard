const apiKey = '471e8b58543a4fd11458dbc64525fb93c7a6a0e97e776db6747018dcf961aa9d'

try {
    const res = await fetch('https://api.unsplash.com/photos/random?orientation=landscape&query=nature', {
        headers: {
            Authorization: `Client-ID ${apiKey}`
        }
        })
    const data = await res.json();
    console.log(data)
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (error) {
    document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1483206048520-2321c1a5fb36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDYwODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDkyNTg4Njl8&ixlib=rb-4.1.0&q=80&w=1080)';
    document.getElementById("author").textContent = 'By: Kendal';
    console.error('Error fetching image:', error);
}

const coins = ['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana', 'dogecoin', 'litecoin'];

try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();

    document.getElementById("crypto-top").innerHTML = `
      <img src="${data.image.small}" />
      <span>${data.name}</span>
    `;

    document.getElementById("crypto").innerHTML += `
      <p>🎯: $${data.market_data.current_price.usd}</p>
      <p>👆: $${data.market_data.high_24h.usd}</p>
      <p>👇: $${data.market_data.low_24h.usd}</p>
    `;
    
  } catch (err) {
    console.error(err);
  }