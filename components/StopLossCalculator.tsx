import React from 'react';
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
    takeProfitPrice: number | null;
    stopLossMethod: StopLossMethod;
    setStopLossMethod: (value: StopLossMethod) => void;
    atrValue: string;
    setAtrValue: (value: string) => void;
    atrMultiplier: ATRMultiplierValue;
    setAtrMultiplier: (value: ATRMultiplierValue) => void;
}

const MethodButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; position: 'left' | 'right' }> = ({ active, onClick, children, position }) => {
    const activeClasses = 'bg-brand-primary text-black z-10';
    const inactiveClasses = 'bg-brand-background hover:bg-brand-surface/50';
    const positionClasses = position === 'left' ? 'rounded-l-md' : 'rounded-r-md';
    return (
        <button
            type="button"
            onClick={onClick}
            className={`-ml-px relative inline-flex items-center w-full justify-center px-4 py-2 border border-brand-surface text-sm font-medium text-brand-text-primary focus:z-10 focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors duration-150 ${active ? activeClasses : inactiveClasses} ${positionClasses}`}
        >
            {children}
        </button>
    );
};

const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 text-brand-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const StopLossCalculator: React.FC<StopLossCalculatorProps> = ({
    entryPrice, setEntryPrice,
    stopLossPrice, setStopLossPrice,
    tradeType, setTradeType,
    tpMultiplier, setTpMultiplier,
    riskInPoints, takeProfitPrice,
    stopLossMethod, setStopLossMethod,
    atrValue, setAtrValue,
    atrMultiplier, setAtrMultiplier,
}) => {
    
    const isRiskCalculated = riskInPoints !== null && riskInPoints > 0;
    const isAtrMethod = stopLossMethod === StopLossMethod.ATR;

    return (
        <Card
            title="Step 1: Trade Setup"
            description="Define your entry, stop loss, and take profit levels."
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            }
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                    id="tradeType"
                    label="Trade Type"
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value as TradeType)}
                    options={[
                        { value: TradeType.Long, label: 'Long (Buy)' },
                        { value: TradeType.Short, label: 'Short (Sell)' },
                    ]}
                />
                <Input
                    id="entryPrice"
                    label="Entry Price"
                    type="number"
                    placeholder="e.g., 2350.50"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    tooltip="The price at which you enter the trade."
                />
            </div>

            <div className="mt-4">
                 <label className="block text-sm font-medium text-brand-text-secondary mb-1">Stop Loss Method</label>
                 <div className="flex">
                    <MethodButton active={stopLossMethod === StopLossMethod.Manual} onClick={() => setStopLossMethod(StopLossMethod.Manual)} position="left">Manual</MethodButton>
                    <MethodButton active={isAtrMethod} onClick={() => setStopLossMethod(StopLossMethod.ATR)} position="right">ATR-Based</MethodButton>
                 </div>
            </div>

            {isAtrMethod && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 bg-brand-background rounded-md border border-brand-surface">
                     <Input
                        id="atrValue"
                        label="ATR Value (Points)"
                        type="number"
                        placeholder="e.g., 12.50"
                        value={atrValue}
                        onChange={(e) => setAtrValue(e.target.value)}
                        tooltip="The current Average True Range value for XAUUSD."
                    />
                    <div>
                        <label className="block text-sm font-medium text-brand-text-secondary mb-1">
                            ATR Multiplier
                            <span title="The factor to multiply the ATR by." className="cursor-help">
                                <InfoIcon />
                            </span>
                        </label>
                        <div className="flex">
                            <MethodButton
                                active={atrMultiplier === '1.5'}
                                onClick={() => setAtrMultiplier('1.5')}
                                position="left"
                            >
                                1.5x
                            </MethodButton>
                            <MethodButton
                                active={atrMultiplier === '2'}
                                onClick={() => setAtrMultiplier('2')}
                                position="right"
                            >
                                2x
                            </MethodButton>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                 <Input
                    id="stopLossPrice"
                    label="Stop Loss Price"
                    type="number"
                    placeholder={isAtrMethod ? "Calculated from ATR" : "e.g., 2340.00"}
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    tooltip="The price at which you will exit the trade for a loss."
                    disabled={isAtrMethod}
                    readOnly={isAtrMethod}
                />
            </div>


            {isRiskCalculated && (
                 <div className="mt-4 space-y-4">
                    <p className="text-sm text-center text-brand-text-secondary">
                        Risk: <span className="font-bold text-brand-danger">{riskInPoints.toFixed(2)} points</span>
                    </p>
                    <Select
                        id="tpMultiplier"
                        label="Take Profit Multiplier"
                        value={tpMultiplier}
                        onChange={(e) => setTpMultiplier(e.target.value as TPMultiplier | '')}
                        options={[
                            { value: '', label: 'Select R:R Multiplier' },
                            { value: '2', label: '2x Risk (1:2 R:R)' },
                            { value: '2.5', label: '2.5x Risk (1:2.5 R:R)' },
                            { value: '3', label: '3x Risk (1:3 R:R)' },
                        ]}
                    />
                 </div>
            )}
            
            {takeProfitPrice !== null && (
                <div className="mt-6 p-4 rounded-lg bg-brand-background text-center">
                    <p className="text-sm text-brand-text-secondary">Calculated Take Profit Price</p>
                    <p className="text-3xl font-bold text-brand-success">
                        ${takeProfitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            )}
        </Card>
    );
};

export default StopLossCalculator;