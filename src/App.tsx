import React, { useState } from 'react'
import Game from './components/Game'

const frameworks = ['React', 'Angular', 'Vue']

function App() {
    const [gameState, setGameState] = useState('STARTED')

    const startGame = () => {
        setGameState('STARTED')
    }

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center">
            {gameState === 'NOT_START' ? (
                <div className="flex flex-col">
                    <h1 className="text-xl text-center">Framework Matcher</h1>
                    <button
                        className="bg-gray-300 px-2 py-2 mt-4 rounded-sm text-lg inline-block mx-auto"
                        onClick={startGame}
                    >
                        Start Game
                    </button>
                </div>
            ) : null}

            {gameState === 'STARTED' ? <Game frameworks={frameworks} /> : null}

            {gameState === 'END' ? <div>Show score and stuff</div> : null}
        </div>
    )
}

export default App
