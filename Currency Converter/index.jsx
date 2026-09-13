const { useState, useMemo } = React;

export function CurrencyConverter() {

  const [value, setValue] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const rates = { USD: 1, EUR: 0.92, GBP: 0.78, JPY: 156.7, };

  const convertsAmount = useMemo(()=> {
    const amount = Number(value) || 0;
    const baseAmount = amount/rates[fromCurrency];

    return {
      USD: baseAmount * rates.USD,
      EUR: baseAmount * rates.EUR,
      GBP: baseAmount * rates.GBP,
      JPY: baseAmount * rates.JPY,
    }
  },[value,fromCurrency]);

  const convertedAmount = convertsAmount[toCurrency];

  return(
    <div>
      <h1 id="heading">Currency Converter</h1>
      <label htmlFor="units">{fromCurrency} to {toCurrency} Conversion
      </label>
      <input type="number" id="units" value={value || 0}
      onChange={(e)=>setValue(e.target.value)}/>
     <label htmlFor="start-conversion">
     Start currency
     </label>
     <select id="start-conversion"  value={fromCurrency}
     onChange={(e)=>setFromCurrency(e.target.value)}>
     <option>USD</option>
     <option>EUR</option>
     <option>GBP</option>
     <option>JPY</option>
     </select>
     <label htmlFor="target-conversion">
     Target currency
     </label>
     <select id="target-conversion"  value={toCurrency}
     onChange={(e)=>setToCurrency(e.target.value)}
     >
     <option>USD</option>
     <option>EUR</option>
     <option>GBP</option>
     <option>JPY</option>
     </select>
     <p id="final-conversion">Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}</p>
    </div>
  )
}
