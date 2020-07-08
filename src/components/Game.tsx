import React, { useState, useEffect, useCallback } from 'react'
import Card from './Card'
import { BaseCard, CardState } from '../types'

type GameProps = {
    frameworks: string[]
}

function Game({ frameworks }: GameProps) {
    const initialCards: BaseCard[] = frameworks
        .map(f => [
            { text: f, id: f + '-1' },
            { text: f, id: f + '-2' },
        ])
        .flat()
    shuffle(initialCards)
    const initialState = initialCards.map(c => ({ ...c, flipped: false }))

    const [matchPair, setMatchPair] = useState<string[]>([])
    const [cards, setCards] = useState<CardState[]>(initialState)

    const flipCard = useCallback(
        (id: string) => {
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

        const [card1, card2] = matchPair.map(c => c.split('-')[0])

        if (card1 !== card2) {
            setTimeout(() => {
                flipCard(matchPair[0])
                flipCard(matchPair[1])
                setMatchPair([])
            }, 700)
            return
        }

        setMatchPair([])
    }, [flipCard, matchPair])

    function handleCardClick(id: string) {
        if (matchPair.length === 2) {
            return
        }

        const newCards = [...cards]
        const index = newCards.findIndex(card => card.id === id)

        if (newCards[index].flipped) {
            return
        }

        flipCard(id)
        setMatchPair([...matchPair, id])
    }

    return (
        <div>
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

// type Action = { type: 'CARD_CLICKED'; cardId: string }

// const initalState: GameState = {
//     cardsClicked: [],
//     cards: cards.map(c => ({ ...cards, flipped: false })),
// }

// function reducer(state: GameState, action: Action): GameState {
//     console.log(action)
//     return state
// }

// const [state, dispatch] = useReducer(reducer, initalState)
