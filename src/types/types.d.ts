export interface Level {
    rooms: Room[]
}

export interface Room {
    id: number
    doors: Door[]
}

interface Door {
    roomInside: number
}
