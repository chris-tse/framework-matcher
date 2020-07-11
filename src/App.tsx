import React, { useState } from 'react'
import Game from './components/Game'

type AppState = 'NOT_STARTED' | 'GAME_STARTED' | 'GAME_WON'

const frameworks = ['React', 'Angular', 'Vue']

function App() {
    const [gameState, setGameState] = useState<AppState>('NOT_STARTED')

    const startGame = () => {
        setGameState('GAME_STARTED')
    }

    const winGame = () => {
        setGameState('GAME_WON')
    }

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center">
            {gameState === 'NOT_STARTED' ? (
                <div className="flex flex-col">
                    <h1 className="text-4xl text-center font-bold">Framework Matcher</h1>
                    <button
                        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 mt-4 rounded-md text-2xl inline-block mx-auto"
                        onClick={startGame}
                    >
                        Start Game
                    </button>
                </div>
            ) : null}

            {gameState === 'GAME_STARTED' ? <Game onWin={winGame} frameworks={frameworks} /> : null}

            {gameState === 'GAME_WON' ? (
                <div className="flex flex-col">
                    <h1 className="text-4xl text-center font-bold">You Win!</h1>
                    <button
                        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 mt-4 rounded-md text-2xl inline-block mx-auto"
                        onClick={startGame}
                    >
                        Play Again
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default App
