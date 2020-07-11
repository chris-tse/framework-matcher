import React, { useState, useEffect, useCallback } from 'react'
import Card from './Card'
import { BaseCard, CardState } from '../types'

type GameProps = {
    frameworks: string[]
    onWin: Function
}

function Game({ frameworks, onWin: endGame }: GameProps) {
    const initialCards: BaseCard[] = frameworks
        .map(f => [
            { text: f, id: f + '-1' },
            { text: f, id: f + '-2' },
        ])
        .flat()
    shuffle(initialCards)
    const initialState = initialCards.map(c => ({ ...c, flipped: false }))

    const [matchPair, setMatchPair] = useState<string[]>([])
    const [disableClick, setDisableClick] = useState(false)
    const [cards, setCards] = useState<CardState[]>(initialState)

    const flipCard = useCallback(
        (id: string) => {
            console.log('flipping', id)
            const newCards = [...cards]
            const index = newCards.findIndex(card => card.id === id)

            newCards[index].flipped = !newCards[index].flipped
            setCards([...newCards])
        },
        [cards]
    )

    useEffect(() => {
        if (matchPair.length < 2) {
            return
        }

        console.log('Match pair formed with', matchPair[0], matchPair[1])

        const [card1, card2] = matchPair.map(c => c.split('-')[0])

        if (card1 !== card2) {
            setDisableClick(true)
            setTimeout(() => {
                flipCard(matchPair[0])
                flipCard(matchPair[1])
                setMatchPair([])
                setTimeout(() => setDisableClick(false), 400)
            }, 700)
            return
        }

        const numUnflipped = cards.map(c => c.flipped).filter(c => !c).length

        if (numUnflipped === 0) {
            setTimeout(() => endGame(), 1000)
        }

        setMatchPair([])
    }, [matchPair])

    function handleCardClick(id: string) {
        if (matchPair.length === 2 || disableClick) {
            return
        }

        console.log(id, 'clicked')

        const newCards = [...cards]
        const index = newCards.findIndex(card => card.id === id)

        if (newCards[index].flipped) {
            return
        }

        flipCard(id)
        setMatchPair([...matchPair, id])
    }

    return (
        <div className="grid gap-4 grid-cols-easy grid-rows-easy mx-auto">
            {cards.map(card => {
                return (
                    <Card
                        key={card.id}
                        cardId={card.id}
                        handleCardClick={handleCardClick}
                        text={card.text}
                        flipped={card.flipped}
                    />
                )
            })}
        </div>
    )
}

function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default Game
