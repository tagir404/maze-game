export interface Level {
    background: string
    rooms: Room[]
}

export interface Room {
    doors: Door[]
    background: string
}

interface Door {
    background: string
    roomInside: number
}
