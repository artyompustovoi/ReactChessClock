import React from 'react';

interface Player {
    name: string;
    time: number;
    isActive: boolean;
    onToggle: () => void;
};

const PlayerClock: React.FC<Player> = ({ name, time, isActive, onToggle }) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="player">
            <h2>{name}</h2>
            <h3>{formatTime(time)}</h3>
            <button onClick={onToggle} disabled={!isActive}>
                {isActive ? 'Конец хода' : 'Начало хода'}
            </button>
        </div>
    );
};

export default PlayerClock;
