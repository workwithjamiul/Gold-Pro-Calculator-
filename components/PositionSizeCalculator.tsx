import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import { TPMultiplier } from '../types';

interface PositionSizeCalculatorProps {
    accountBalance: string;
    setAccountBalance: (value: string) => void;
    riskPerTradeUSD: string;
    setRiskPerTradeUSD: (value: string) => void;
    lotSize: number | null;
    entryPrice: string;
    stopLossPrice: string;
    tpMultiplier: TPMultiplier | '';
    takeProfitPrice: number | null;
    riskPercentage: number | null;
    onReset: () => void;
}

const SummaryItem: React.FC<{ label: string; value: string | number | null; unit?: string; color?: string; isLast?: boolean }> = ({ label, value, unit = '', color = 'text-white', isLast = false }) => (
    <div className={`flex justify-between items-center py-3.5 ${!isLast ? 'border-b border-brand-border/40' : ''}`}>
        <p className="text-sm font-medium text-brand-text-secondary">{label}</p>
        <p className={`text-base font-semibold tracking-wide ${color}`}>
            {value !== null && value !== '' ? `${value}${unit}` : '—'}
        </p>
    </div>
);

const PositionSizeCalculator: React.FC<PositionSizeCalculatorProps> = ({
    accountBalance, setAccountBalance,
    riskPerTradeUSD, setRiskPerTradeUSD,
    lotSize,
    entryPrice,
    stopLossPrice,
    tpMultiplier,
    takeProfitPrice,
    riskPercentage,
    onReset,
}) => {

    const [lotSizeAnimationKey, setLotSizeAnimationKey] = useState(0);

    useEffect(() => {
        if (lotSize !== null && lotSize > 0) {
            setLotSizeAnimationKey(prev => prev + 1);
        }
    }, [lotSize]);
    
    return (
        <div className="space-y-8">
            <Card
                title="Risk & Position Sizing"
                description="Determine the optimal lot size for your account."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        id="accountBalance"
                        label="Account Balance"
                        type="number"
                        placeholder="e.g. 10000"
                        value={accountBalance}
                        onChange={(e) => setAccountBalance(e.target.value)}
                        tooltip="Your total trading capital."
                    />
                    <Input
                        id="riskPerTradeUSD"
                        label="Risk Amount ($)"
                        type="number"
                        placeholder="e.g. 100"
                        value={riskPerTradeUSD}
                        onChange={(e) => setRiskPerTradeUSD(e.target.value)}
                        tooltip="The maximum dollar amount you are comfortable losing on this trade."
                    />
                </div>

                {lotSize !== null && lotSize > 0 && (
                    <div className="mt-8 bg-brand-background/50 rounded-2xl border border-brand-border/50 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-text-secondary mb-2">Recommended Lot Size</p>
                        <p 
                            key={lotSizeAnimationKey}
                            className="text-5xl font-extrabold text-brand-primary tracking-tighter animate-glow-accent drop-shadow-[0_0_15px_rgba(255,214,10,0.2)]">
                            {lotSize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                )}
            </Card>

            {lotSize !== null && lotSize > 0 && (
                <Card
                    title="Trade Plan Summary"
                    description="Confirm your parameters before executing."
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    }
                >
                    <div className="bg-brand-input/30 rounded-xl px-5 py-2 border border-brand-border/30">
                         <SummaryItem label="Entry Price" value={parseFloat(entryPrice).toFixed(2)} unit=" $" />
                         <SummaryItem label="Stop Loss" value={parseFloat(stopLossPrice).toFixed(2)} unit=" $" color="text-brand-danger" />
                         <SummaryItem label="Take Profit" value={takeProfitPrice?.toFixed(2) ?? null} unit=" $" color="text-brand-success" />
                         <SummaryItem label="Risk Amount" value={parseFloat(riskPerTradeUSD).toFixed(2)} unit=" $" />
                         <SummaryItem label="Risk %" value={riskPercentage} unit=" %" />
                         <SummaryItem label="Risk:Reward" value={`1:${tpMultiplier}`} />
                         <SummaryItem label="Lot Size" value={lotSize} color="text-brand-primary" isLast />
                    </div>
                    <div className="mt-8">
                        <Button onClick={onReset} variant="reset">Start New Plan</Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default PositionSizeCalculator;