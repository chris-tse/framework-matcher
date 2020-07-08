import React, { SyntheticEvent } from 'react'

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
            className={`border border-gray-200 rounded-md shadow-md hover:shadow-lg cursor-pointer text-center relative mx-4 my-4 h-48 w-56 inline-flex justify-center items-center transition duration-500 ${
                flipped ? 'is-flipped' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div
                className="absolute w-full h-full flex flex-col justify-center"
                style={{ backfaceVisibility: 'hidden' }}
            >
                ?
            </div>
            <div
                className="absolute w-full h-full flex flex-col justify-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                {text}
            </div>
        </div>
    )
}

export default Card
