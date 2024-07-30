import { useState, useEffect } from 'react';

const useCurrencyInfo = (fromCurrency) => {
  const [currencyInfo, setCurrencyInfo] = useState({});

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        setCurrencyInfo(data.rates);
      } catch (error) {
        console.error("Failed to fetch currency info:", error);
      }
    };

    fetchCurrencyInfo();
  }, [fromCurrency]);

  return currencyInfo;
};

export default useCurrencyInfo;
