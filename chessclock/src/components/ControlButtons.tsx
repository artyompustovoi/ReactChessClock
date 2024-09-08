import React from 'react';

interface ControlButtonsProps {
    isRunning: boolean;
    onToggleRunning: () => void;
    onRestart: () => void;
    timeInput: number;
    setTimeInput: (time: number) => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ isRunning, onToggleRunning, onRestart, timeInput, setTimeInput }) => {
    return (
        <div className="control-buttons">
            <div className="button-container">
                <button onClick={onToggleRunning}>
                    {isRunning ? 'Пауза' : 'Старт'}
                </button>
            </div>
            <div className="input-container">
                <input
                    type="number"
                    value={timeInput}
                    onChange={(e) => setTimeInput(Number(e.target.value))}
                    min={1}
                    style={{ width: '50px', textAlign: 'center' }}
                />
                <span> минут</span>
                <button onClick={onRestart} style={{ marginLeft: '10px' }}>
                    Заново
                </button>
            </div>
        </div>
    );
};

export default ControlButtons;
