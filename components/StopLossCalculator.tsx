import React, { useEffect, useState } from 'react';
import { TradeType, TPMultiplier, StopLossMethod, ATRMultiplierValue } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';

interface StopLossCalculatorProps {
    entryPrice: string;
    setEntryPrice: (value: string) => void;
    stopLossPrice: string;
    setStopLossPrice: (value: string) => void;
    tradeType: TradeType;
    setTradeType: (value: TradeType) => void;
    tpMultiplier: TPMultiplier | '';
    setTpMultiplier: (value: TPMultiplier | '') => void;
    riskInPoints: number | null;
    stopLossMethod: StopLossMethod;
    setStopLossMethod: (value: StopLossMethod) => void;
    atrValue: string;
    setAtrValue: (value: string) => void;
    atrMultiplier: ATRMultiplierValue;
    setAtrMultiplier: (value: ATRMultiplierValue) => void;
}

const MethodButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 py-1.5 px-3 rounded-[7px] text-[13px] font-semibold transition-all duration-200 shadow-sm ${
                active 
                ? 'bg-[#636366] text-white shadow-md' 
                : 'bg-transparent text-brand-text-secondary hover:text-white hover:bg-white/5'
            }`}
        >
            {children}
        </button>
    );
};

const SegmentedControl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-[#1C1C1E] border border-brand-border/50 p-1 rounded-lg flex space-x-0.5">
        {children}
    </div>
);

const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1.5 text-brand-text-secondary hover:text-brand-primary transition-colors cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const StopLossCalculator: React.FC<StopLossCalculatorProps> = ({
    entryPrice, setEntryPrice,
    stopLossPrice, setStopLossPrice,
    tradeType, setTradeType,
    tpMultiplier, setTpMultiplier,
    riskInPoints,
    stopLossMethod, setStopLossMethod,
    atrValue, setAtrValue,
    atrMultiplier, setAtrMultiplier,
}) => {
    const isRiskCalculated = riskInPoints !== null && riskInPoints > 0;
    const isAtrMethod = stopLossMethod === StopLossMethod.ATR;
    const [slAnimationKey, setSlAnimationKey] = useState(0);

    useEffect(() => {
        if (stopLossPrice) {
            setSlAnimationKey(prev => prev + 1);
        }
    }, [stopLossPrice]);

    return (
        <Card
            title="Trade Setup"
            description="Configure your entry, direction, and stop loss parameters."
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    id="tradeType"
                    label="Trade Direction"
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value as TradeType)}
                    options={[
                        { value: TradeType.Long, label: 'Long (Buy)' },
                        { value: TradeType.Short, label: 'Short (Sell)' },
                    ]}
                    tooltip="Select 'Long' if you expect the price to go up, or 'Short' if you expect it to go down."
                />
                <Input
                    id="entryPrice"
                    label="Entry Price"
                    type="number"
                    placeholder="e.g. 2350.50"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    tooltip="The price at which you plan to execute the trade."
                />
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border/30">
                 <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-3 ml-1">
                    Stop Loss Method
                    <span title="Choose 'Manual' to enter a specific price or 'ATR' to calculate based on market volatility." className="cursor-help">
                        <InfoIcon />
                    </span>
                 </label>
                 <SegmentedControl>
                    <MethodButton active={stopLossMethod === StopLossMethod.Manual} onClick={() => setStopLossMethod(StopLossMethod.Manual)}>Manual Input</MethodButton>
                    <MethodButton active={isAtrMethod} onClick={() => setStopLossMethod(StopLossMethod.ATR)}>ATR Calculation</MethodButton>
                 </SegmentedControl>
            </div>

            {isAtrMethod && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-5 bg-brand-input/20 rounded-2xl border border-brand-border/30 animate-in fade-in slide-in-from-top-2 duration-300">
                     <Input
                        id="atrValue"
                        label="ATR Value (14)"
                        type="number"
                        placeholder="e.g. 3.50"
                        value={atrValue}
                        onChange={(e) => setAtrValue(e.target.value)}
                        tooltip="Enter the current ATR value from your trading chart (usually period 14)."
                    />
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-3 ml-1">
                            ATR Multiplier
                            <span title="Determines how wide your stop loss will be. Higher multiplier = wider stop." className="cursor-help">
                                <InfoIcon />
                            </span>
                        </label>
                        <SegmentedControl>
                            <MethodButton
                                active={atrMultiplier === '1.5'}
                                onClick={() => setAtrMultiplier('1.5')}
                            >
                                1.5x (Tight)
                            </MethodButton>
                            <MethodButton
                                active={atrMultiplier === '2'}
                                onClick={() => setAtrMultiplier('2')}
                            >
                                2.0x (Standard)
                            </MethodButton>
                        </SegmentedControl>
                    </div>
                </div>
            )}

            <div className="mt-8">
                {isAtrMethod ? (
                     <div className="bg-brand-surface rounded-2xl p-6 text-center border border-brand-border/30 shadow-ios relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-danger/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-text-secondary mb-2">Calculated Stop Loss</p>
                        <p 
                            key={slAnimationKey}
                            className="text-4xl font-bold text-brand-danger animate-glow-danger drop-shadow-[0_0_10px_rgba(255,69,58,0.2)]">
                            {stopLossPrice ? `$${stopLossPrice}` : '...'}
                        </p>
                     </div>
                ) : (
                    <Input
                        id="stopLossPrice"
                        label="Stop Loss Price"
                        type="number"
                        placeholder="e.g. 2340.00"
                        value={stopLossPrice}
                        onChange={(e) => setStopLossPrice(e.target.value)}
                        tooltip="The price level where the trade will be closed to prevent further loss."
                    />
                )}
            </div>


            {isRiskCalculated && (
                 <div className="mt-8 pt-6 border-t border-brand-border/30 space-y-6 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between px-5 py-4 bg-brand-danger/10 rounded-xl border border-brand-danger/20">
                         <span className="text-sm font-semibold text-brand-danger/90">Risk Distance</span>
                         <span className="text-xl font-bold text-brand-danger">{riskInPoints.toFixed(2)} pts</span>
                    </div>

                    <Select
                        id="tpMultiplier"
                        label="Take Profit Target"
                        value={tpMultiplier}
                        onChange={(e) => setTpMultiplier(e.target.value as TPMultiplier | '')}
                        options={[
                            { value: '', label: 'Select Risk to Reward Ratio' },
                            { value: '2', label: '1:2 (Standard)' },
                            { value: '2.5', label: '1:2.5 (Aggressive)' },
                            { value: '3', label: '1:3 (High Reward)' },
                        ]}
                        tooltip="Automatically sets a Take Profit price based on your risk distance. Recommended 1:2 or higher."
                    />
                 </div>
            )}
        </Card>
    );
};

export default StopLossCalculator;