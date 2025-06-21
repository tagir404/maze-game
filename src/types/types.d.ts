export interface Level {
    background: string
    rooms: Room[]
}

export interface Room {
    id: number
    doors: Door[]
    background: string
}

interface Door {
    background: string
    roomInside: number
}
