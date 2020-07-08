export type BaseCard = {
    text: string
    id: string
}

export type CardState = BaseCard & { flipped: boolean }

export type GameState = {
    cardsClicked: string[]
    cards: CardState[]
}
