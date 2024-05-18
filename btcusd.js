var elem = document.createElement("div");
  elem.style.cssText =
    "position:absolute;top:5%;left:1rem;opacity:0.8`;z-index:100;background:transparent;color:#e41827;padding:0 0;";
  elem.innerHTML =
    '<div><p style="font-size: 3rem;font-weight: 800;font-family: sans-serif;text-align: center;"id="signal"></p><button id = "startBot" style="font-size: 3rem;font-weight: 600;font-family: sans-serif;text-align: center; padding:1rem 1.5rem; border-radius:5%; background-color:blue; color: white">start Bot</button></div>';
  document.body.appendChild(elem);
 let startButton = document.getElementById("startBot");
 startButton.addEventListener("click",
 function start() {
  //await sleep(10000);
     startButton.disabled = true;
     startButton.innerText = 'Bot Running';
  let pair = document.querySelector("body > mtr-root > mtr-dashboard-desktop > div.dashboard-desktop__route-section > mtr-trading-dashboard-desktop > mtr-layout-main-desktop > div.layout-main-desktop__chart > mtr-chart-desktop > div > div > div.chart-desktop-header__left-col.ng-star-inserted > mtr-chart-title > div > div.chart-title__main > div > span");
  let selector = document.querySelector("#MarketWatch-QuickSell > div");
  let currency = selector;
  let stoch = document.querySelector(`#graph-${pair.innerText}-0 > div:nth-child(3) > div.graph-stats`);
  let rsi = document.querySelector(`#graph-${pair.innerText}-0 > div:nth-child(5) > div.graph-stats`)
  let lotSize = document.querySelector("#Market-Watch-VolumeEditField");
  lotSize.value = 0.05;
  lotSize.click();

 
  let price;
  let buyCount = 0;
  let sellCount = 0;
  setInterval(() => {
    updatePrice();
  }, 500);
  let signal = document.getElementById("signal");

  function updatePrice() {
        let stoch = document.querySelector(`#graph-${pair.innerText}-0 > div:nth-child(3) > div.graph-stats`);
  let rsi = document.querySelector(`#graph-${pair.innerText}-0 > div:nth-child(5) > div.graph-stats`)
    let plValue = document.querySelector('.nav-bar-desktop__profit-value');
    let pl = parseFloat(plValue.innerText);
    let selectBtn = pl ? document.querySelector('#selectButton') : '';
      if(signal.innerText=='BUY NOW'){
    if (pl !== 0.00 && pl < -50) {
      selectBtn.click();
      document.querySelector('#selectButton-closeAll').click();
    } else if (pl !== 0.00 && parseInt(rsi.innerText.slice(5, 9))>70) {
      selectBtn.click();
      document.querySelector('#selectButton-closeAll').click();
    }
      } else if(signal.innerText=='SELL NOW'){
    if (pl !== 0.00 && pl < -15) {
      selectBtn.click();
      document.querySelector('#selectButton-closeAll').click();
    } else if (pl !== 0.00 && parseInt(rsi.innerText.slice(5, 9))<30) {
      selectBtn.click();
      document.querySelector('#selectButton-closeAll').click();
    }
      }
    parseFloat(currency.innerText.slice(5)) < price
      ? (sellCount++)
      : parseFloat(currency.innerText.slice(5)) > price
      ? (buyCount++)
      : '';
    if (buyCount - sellCount > 3) {
      buyCount = 0;
      sellCount = 0;
      let sell = document.getElementById("MarketWatch-QuickSell");
      console.log(`SELL NOW!!!!`);
      //signal.innerText = "SELL NOW";
    } else if (sellCount - buyCount > 3) {
      buyCount = 0;
      sellCount = 0;
      let buy = document.getElementById("MarketWatch-QuickBuy");
      console.log("BUY NOW!!!!");
      //signal.innerText = "BUY NOW";
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
    } else if (parseInt(stoch.innerText.slice(3, 7)) <= 20 && parseInt(stoch.innerText.slice(15, 19)) <= 20 && parseInt(rsi.innerText.slice(5, 9))<=30) {
      let buy = document.getElementById("MarketWatch-QuickBuy");
        signal.innerText = "BUY NOW";
      buy.click();
    } else if (parseInt(stoch.innerText.slice(3, 7)) >= 80 && parseInt(stoch.innerText.slice(15, 19)) >= 80 && parseInt(rsi.innerText.slice(5, 9))>=70) {
      let sell = document.getElementById("MarketWatch-QuickSell");
        signal.innerText = "SELL NOW";
      sell.click();
    }
    price = currency.innerText.slice(5);
    console.log(`Bot Active \n pair: ${pair.innerText} \n profit/loss:${pl} \n stoch: ${parseInt(stoch.innerText.slice(3, 8))}\n avg: ${parseInt(stoch.innerText.slice(15, 19))}\n signal2: ${parseInt(rsi.innerText.slice(5, 9))}`);
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
});

