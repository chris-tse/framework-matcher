import React, { SyntheticEvent } from 'react'
import logos from '../logos'

type CardProps = {
    text: string
    flipped: boolean
    cardId: string
    handleCardClick: (id: string) => void
}

function Card({ text, flipped, handleCardClick, cardId }: CardProps) {
    function handleClick(e: SyntheticEvent) {
        handleCardClick(cardId)
    }

    return (
        <div
            onClick={handleClick}
            className={`bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg cursor-pointer text-center relative mx-4 my-4 h-full w-full inline-flex justify-center items-center transition duration-500 ${
                flipped ? 'is-flipped' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div
                className="absolute w-full h-full flex flex-col justify-center backface-hidden"
                style={{ transformStyle: 'preserve-3d' }}
            >
                ?
            </div>
            <div
                className="absolute w-full h-full flex flex-col justify-center p-4 backface-hidden"
                style={{ transform: 'rotateY(180deg)' }}
            >
                <img src={logos[text.toLowerCase()]} alt={`${text} logo`} />
            </div>
        </div>
    )
}

export default Card
