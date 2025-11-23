import React, { useState, useEffect } from 'react';
import StopLossCalculator from './components/StopLossCalculator';
import PositionSizeCalculator from './components/PositionSizeCalculator';
import { TradeType, TPMultiplier, StopLossMethod, ATRMultiplierValue } from './types';

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  // Inputs
  const [entryPrice, setEntryPrice] = useState<string>('');
  const [stopLossPrice, setStopLossPrice] = useState<string>('');
  const [tradeType, setTradeType] = useState<TradeType>(TradeType.Long);
  const [tpMultiplier, setTpMultiplier] = useState<TPMultiplier | ''>('');
  const [accountBalance, setAccountBalance] = useState<string>('');
  const [riskPerTradeUSD, setRiskPerTradeUSD] = useState<string>('');
  
  // ATR Inputs
  const [stopLossMethod, setStopLossMethod] = useState<StopLossMethod>(StopLossMethod.Manual);
  const [atrValue, setAtrValue] = useState<string>('');
  const [atrMultiplier, setAtrMultiplier] = useState<ATRMultiplierValue>('2');

  // Calculated Values
  const [riskInPoints, setRiskInPoints] = useState<number | null>(null);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number | null>(null);
  const [lotSize, setLotSize] = useState<number | null>(null);
  const [riskPercentage, setRiskPercentage] = useState<number | null>(null);

  // Animation key for TP price
  const [tpAnimationKey, setTpAnimationKey] = useState(0);
  
  // --- EFFECTS for REAL-TIME CALCULATION ---

  // Animate TP Price on change
  useEffect(() => {
    if (takeProfitPrice !== null) {
        setTpAnimationKey(prev => prev + 1);
    }
  }, [takeProfitPrice]);


  // Calculate Stop Loss Price from ATR if that method is selected
  useEffect(() => {
    if (stopLossMethod === StopLossMethod.ATR) {
      const entry = parseFloat(entryPrice);
      const atr = parseFloat(atrValue);
      const multiplier = parseFloat(atrMultiplier);

      if (isNaN(entry) || isNaN(atr) || isNaN(multiplier) || atr <= 0 || multiplier <= 0) {
        setStopLossPrice(''); // Clear if inputs are invalid
        return;
      }

      const atrOffset = atr * multiplier;
      let calculatedSl;
      if (tradeType === TradeType.Long) {
        calculatedSl = entry - atrOffset;
      } else { // SHORT
        calculatedSl = entry + atrOffset;
      }
      setStopLossPrice(calculatedSl.toFixed(2));
    }
  }, [entryPrice, tradeType, stopLossMethod, atrValue, atrMultiplier]);


  // Calculate Risk in Points & Take Profit Price
  useEffect(() => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLossPrice);

    if (isNaN(entry) || isNaN(sl) || sl === entry) {
      setRiskInPoints(null);
      setTakeProfitPrice(null);
      return;
    }
    
    if ((tradeType === TradeType.Long && sl >= entry) || (tradeType === TradeType.Short && sl <= entry)) {
        setRiskInPoints(null);
        setTakeProfitPrice(null);
        return;
    }

    const risk = Math.abs(entry - sl);
    setRiskInPoints(risk);

    if (tpMultiplier) {
      const multiplier = parseFloat(tpMultiplier);
      const profitDistance = risk * multiplier;
      let tp;
      if (tradeType === TradeType.Long) {
        tp = entry + profitDistance;
      } else {
        tp = entry - profitDistance;
      }
      setTakeProfitPrice(parseFloat(tp.toFixed(2)));
    } else {
      setTakeProfitPrice(null);
    }
  }, [entryPrice, stopLossPrice, tradeType, tpMultiplier]);

  // Calculate Lot Size & Risk Percentage
  useEffect(() => {
    const riskUSD = parseFloat(riskPerTradeUSD);
    const balance = parseFloat(accountBalance);

    if (isNaN(riskUSD) || riskInPoints === null || riskInPoints <= 0) {
      setLotSize(null);
    } else {
      const calculatedLotSize = riskUSD / (riskInPoints * 100);
      setLotSize(parseFloat(calculatedLotSize.toFixed(2)));
    }

    if (isNaN(balance) || isNaN(riskUSD) || balance <= 0) {
      setRiskPercentage(null);
    } else {
      const percentage = (riskUSD / balance) * 100;
      setRiskPercentage(parseFloat(percentage.toFixed(2)));
    }
  }, [riskPerTradeUSD, accountBalance, riskInPoints]);
  
  const handleReset = () => {
    setEntryPrice('');
    setStopLossPrice('');
    setTradeType(TradeType.Long);
    setTpMultiplier('');
    setAccountBalance('');
    setRiskPerTradeUSD('');
    setRiskInPoints(null);
    setTakeProfitPrice(null);
    setLotSize(null);
    setRiskPercentage(null);
    setStopLossMethod(StopLossMethod.Manual);
    setAtrValue('');
    setAtrMultiplier('2');
  };

  return (
    <div className="min-h-screen bg-brand-background p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="text-center pt-8 pb-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            XAUUSD <span className="text-brand-primary">Pro</span>
          </h1>
          <p className="text-brand-text-secondary font-medium text-lg">
            Professional Trading Calculator
          </p>
        </header>
        
        <main className="space-y-8">
            <StopLossCalculator
                entryPrice={entryPrice}
                setEntryPrice={setEntryPrice}
                stopLossPrice={stopLossPrice}
                setStopLossPrice={setStopLossPrice}
                tradeType={tradeType}
                setTradeType={setTradeType}
                tpMultiplier={tpMultiplier}
                setTpMultiplier={setTpMultiplier}
                riskInPoints={riskInPoints}
                stopLossMethod={stopLossMethod}
                setStopLossMethod={setStopLossMethod}
                atrValue={atrValue}
                setAtrValue={setAtrValue}
                atrMultiplier={atrMultiplier}
                setAtrMultiplier={setAtrMultiplier}
            />

            {takeProfitPrice !== null && (
                <div className="bg-brand-surface rounded-2xl p-6 text-center border border-brand-border/30 shadow-ios relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-text-secondary mb-2">Projected Take Profit</p>
                    <p 
                        key={tpAnimationKey}
                        className="text-4xl font-bold text-brand-success animate-glow-success drop-shadow-[0_0_10px_rgba(48,209,88,0.2)]">
                        ${takeProfitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            )}

            {takeProfitPrice !== null && (
                <PositionSizeCalculator
                    accountBalance={accountBalance}
                    setAccountBalance={setAccountBalance}
                    riskPerTradeUSD={riskPerTradeUSD}
                    setRiskPerTradeUSD={setRiskPerTradeUSD}
                    lotSize={lotSize}
                    // Summary Props
                    entryPrice={entryPrice}
                    stopLossPrice={stopLossPrice}
                    tpMultiplier={tpMultiplier}
                    takeProfitPrice={takeProfitPrice}
                    riskPercentage={riskPercentage}
                    onReset={handleReset}
                />
            )}
        </main>

        <footer className="text-center pb-8 pt-4">
            <p className="text-brand-text-secondary/50 text-xs font-medium uppercase tracking-widest">Designed for Professional Traders</p>
        </footer>
      </div>
    </div>
  );
};

export default App;