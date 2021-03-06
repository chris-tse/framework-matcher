import React, { useState, useEffect, useCallback } from 'react'
import Card from './Card'
import { BaseCard, CardState } from '../types'

type GameProps = {
    frameworks: string[]
    onWin: Function
}

const debug = (...message: string[]) => {
    if (window.location.href.indexOf('?debug') > -1) {
        console.log(...message)
    }
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
            debug('flipping', id)
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

        setDisableClick(true)

        debug('Match pair formed with', matchPair[0], matchPair[1])

        const [card1, card2] = matchPair.map(c => c.split('-')[0])

        if (card1 !== card2) {
            debug('No match, flipping back over')
            setTimeout(() => {
                const [pair1, pair2] = matchPair
                setMatchPair([])
                flipCard(pair1)
                flipCard(pair2)
                setTimeout(() => setDisableClick(false), 400)
            }, 700)
            return
        }

        debug('Cards match, checking for remaining unflipped')

        const numUnflipped = cards.map(c => c.flipped).filter(c => !c).length

        if (numUnflipped === 0) {
            setTimeout(() => endGame(), 1000)
        }

        setMatchPair([])
        setDisableClick(false)
    }, [cards, flipCard, matchPair, endGame])

    function handleCardClick(id: string) {
        const clickedCard = cards.find(card => card.id === id)

        if (clickedCard?.flipped || matchPair.length === 2 || disableClick) {
            return
        }

        debug(id, 'clicked')

        const newCards = [...cards]
        const index = newCards.findIndex(card => card.id === id)

        if (newCards[index].flipped) {
            return
        }

        flipCard(id)
        setMatchPair([...matchPair, id])
    }

    return (
        <div className="grid gap-4 justify-center items-center md:grid-cols-easy md:grid-rows-easy grid-rows-easyMobile grid-cols-easyMobile mx-auto">
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
