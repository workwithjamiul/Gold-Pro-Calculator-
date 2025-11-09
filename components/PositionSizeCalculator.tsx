import React from 'react';
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
    // Summary props
    entryPrice: string;
    stopLossPrice: string;
    tpMultiplier: TPMultiplier | '';
    takeProfitPrice: number | null;
    riskPercentage: number | null;
    onReset: () => void;
}

const SummaryItem: React.FC<{ label: string; value: string | number | null; unit?: string; color?: string }> = ({ label, value, unit = '', color = 'text-brand-accent' }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-brand-surface/50">
        <p className="text-sm text-brand-text-secondary">{label}</p>
        <p className={`text-base font-bold ${color}`}>
            {value !== null && value !== '' ? `${value}${unit}` : '-'}
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
    
    return (
        <>
            <Card
                title="Step 2: Risk & Sizing"
                description="Define your risk parameters to calculate the lot size."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                }
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        id="accountBalance"
                        label="Account Balance ($)"
                        type="number"
                        placeholder="e.g., 10000"
                        value={accountBalance}
                        onChange={(e) => setAccountBalance(e.target.value)}
                        tooltip="Your total trading account equity."
                    />
                    <Input
                        id="riskPerTradeUSD"
                        label="Risk Per Trade ($)"
                        type="number"
                        placeholder="e.g., 100"
                        value={riskPerTradeUSD}
                        onChange={(e) => setRiskPerTradeUSD(e.target.value)}
                        tooltip="The maximum amount of money you are willing to lose on this trade."
                    />
                </div>

                {lotSize !== null && lotSize > 0 && (
                    <div className="mt-6 p-4 rounded-lg bg-brand-background text-center">
                        <p className="text-sm text-brand-text-secondary">Recommended Lot Size</p>
                        <p className="text-3xl font-bold text-brand-accent">
                            {lotSize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                )}
            </Card>

            {lotSize !== null && lotSize > 0 && (
                <Card
                    title="Step 3: Trade Summary"
                    description="Review your complete trade plan."
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    }
                >
                    <div className="space-y-2">
                         <SummaryItem label="Entry Price" value={parseFloat(entryPrice).toFixed(2)} unit=" $" />
                         <SummaryItem label="Stop Loss Price" value={parseFloat(stopLossPrice).toFixed(2)} unit=" $" color="text-brand-danger" />
                         <SummaryItem label="Take Profit Price" value={takeProfitPrice?.toFixed(2) ?? null} unit=" $" color="text-brand-success" />
                         <SummaryItem label="Risk Per Trade" value={parseFloat(riskPerTradeUSD).toFixed(2)} unit=" $" />
                         <SummaryItem label="Account Balance" value={parseFloat(accountBalance).toFixed(2)} unit=" $" />
                         <SummaryItem label="Risk Percentage" value={riskPercentage} unit=" %" />
                         <SummaryItem label="Risk:Reward Ratio" value={`1:${tpMultiplier}`} />
                         <SummaryItem label="XAUUSD Lot Size" value={lotSize} />
                    </div>
                    <div className="mt-6">
                        <Button onClick={onReset} variant="reset">Start New Calculation</Button>
                    </div>
                </Card>
            )}
        </>
    );
};

export default PositionSizeCalculator;