function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  await sleep(10000);

  let selector = document.querySelector("#MarketWatch-QuickSell > div");
  let currency = selector;
  let stoch = document.querySelector("#graph-BTCUSD-0 > div:nth-child(3) > div.graph-stats");
  let lotSize = document.querySelector("#Market-Watch-VolumeEditField");
  lotSize.value = 0.05;
  lotSize.click();

  var elem = document.createElement("div");
  elem.style.cssText =
    "position:absolute;top:5%;left:1rem;opacity:0.8`;z-index:100;background:transparent;color:#e41827;padding:0 0;";
  elem.innerHTML =
    '<div><p style="font-size: 3rem;font-weight: 800;font-family: sans-serif;text-align: center;"id="signal"></p></div>';
  document.body.appendChild(elem);
  let price;
  let buyCount = 0;
  let sellCount = 0;
  setInterval(() => {
    updatePrice();
  }, 500);
  let signal = document.getElementById("signal");

  function updatePrice() {
    let plValue = document.querySelector('.nav-bar-desktop__profit-value');
    let pl = parseFloat(plValue.innerText);
    let selectBtn = pl ? document.querySelector('#selectButton') : '';
    if (pl !== 0.00 && pl < -15) {
      selectBtn.click();
      document.querySelector('#selectButton-closeAll').click();
    } else if (pl !== 0.00 && pl > 9) {
      selectBtn.click();
      document.querySelector('#selectButton-closeAll').click();
    }
    parseFloat(currency.innerText.slice(5)) < price
      ? (sellCount++)
      : parseFloat(currency.innerText.slice(5)) > price
      ? (buyCount++)
      : '';
    if (buyCount - sellCount > 3) {
      buyCount = 0;
      sellCount = 0;
      beep(400);

      let sell = document.getElementById("MarketWatch-QuickSell");
      console.log(`SELL NOW!!!!`);
      signal.innerText = "SELL NOW";
    } else if (sellCount - buyCount > 3) {
      buyCount = 0;
      sellCount = 0;
      beep(800);
      let buy = document.getElementById("MarketWatch-QuickBuy");
      console.log("BUY NOW!!!!");
      signal.innerText = "BUY NOW";
      /*    fetch('http://localhost:8002/test').then(function (response) {
	            // The API call was successful!
	            return response.json();
          }).then(function (data) {
	            // This is the JSON from our response
	            console.log(data);
          }).catch(function (err) {
	            // There was an error
	            console.warn('Something went wrong.', err);
          }); */
    } else if (parseInt(stoch.innerText.slice(3, 8)) < 15 && parseInt(stoch.innerText.slice(15, 20)) < 15) {
      let buy = document.getElementById("MarketWatch-QuickBuy");
      buy.click();
    } else if (parseInt(stoch.innerText.slice(3, 8)) > 85 && parseInt(stoch.innerText.slice(15, 20)) > 85) {
      let sell = document.getElementById("MarketWatch-QuickSell");
      sell.click();
    }
    price = currency.innerText.slice(5);
    console.log(`buyCount=${buyCount} \n sellCount = ${sellCount} price=${price} \n profit/loss:${pl} \n stochVal = ${parseInt(stoch.innerText.slice(3,8))} \n avg = ${parseInt(stoch.innerText.slice(15,20))}`);
  }

  function beep(freq) {
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = freq;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    // Beep for 500 milliseconds
    setTimeout(function () {
      oscillator.stop();
    }, 500);
  }
})();
