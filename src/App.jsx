import { useState, useEffect } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  useEffect(() => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, from, to, currencyInfo]);

  const swap = () => {
    const previousFrom = from;
    const previousTo = to;

    setFrom(to);
    setTo(from);

    if (currencyInfo[previousFrom] && currencyInfo[previousTo]) {
      setConvertedAmount(amount * currencyInfo[previousFrom]);
    }
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://cdn.images.express.co.uk/img/dynamic/25/750x445/753685.jpg')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <div className="w-full max-w-md mx-auto mt-8 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-2">Conversion Result</h2>
              <p className="text-lg">
                {amount} {from.toUpperCase()} = {convertedAmount} {to.toUpperCase()}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
