import React, { useEffect, useState } from 'react';
import '../css/ChessClockStyles.css';
import PlayerClock from './PlayerClock';
import ControlButtons from './ControlButtons';

interface Player {
    name: string;
    time: number;
    isActive: boolean; 
}

const ChessClock: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([
        { name: 'Белые', time: 300, isActive: true },
        { name: 'Черные', time: 300, isActive: false },
    ]);

    const [isRunning, setIsRunning] = useState(false);
    const [timeInput, setTimeInput] = useState(5);
    const [gameOver, setGameOver] = useState<string | null>(null); 

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                setPlayers((prevPlayers) => {
                    const updatedPlayers = prevPlayers.map((player) =>
                        player.isActive ? { ...player, time: player.time - 1 } : player
                    );

                    
                    if (updatedPlayers.some(player => player.time <= 0)) {
                        setIsRunning(false);
                        setGameOver(updatedPlayers.find(player => player.time <= 0)?.name);
                    }

                    return updatedPlayers;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning]);

    const toggleActivePlayer = () => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) => ({
                ...player,
                isActive: !player.isActive,
            }))
        );
    };

    const handleRestart = () => {
        const initialTime = timeInput * 60; 
        setPlayers([
            { name: 'Белые', time: initialTime, isActive: true },
            { name: 'Черные', time: initialTime, isActive: false },
        ]);
        setIsRunning(false);
        setGameOver(null);
    };

    return (
        <div className="container">
            <h1>Шахматные часы</h1>
            <div className="flex">
                {players.map((player, index) => (
                    <PlayerClock
                        key={index}
                        name={player.name}
                        time={player.time}
                        isActive={player.isActive}
                        onToggle={toggleActivePlayer}
                    />
                ))}
            </div>
            <ControlButtons
                isRunning={isRunning}
                onToggleRunning={() => setIsRunning((prev) => !prev)}
                onRestart={handleRestart}
                timeInput={timeInput}
                setTimeInput={setTimeInput}
            />
            {gameOver && (
                <div className="game-over">
                    <h2>Игра окончена!</h2>
                    <h3>{gameOver}, ваше время вышло!</h3>
                </div>
            )}
        </div>
    );
};

export default ChessClock;
