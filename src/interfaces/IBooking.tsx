export type Trip = {
    title: string,
    duration: number,
    price: number
}

export interface IBooking {
    id: string,
    userId: string,
    tripId: string,
    guests: number,
    date: string,
    trip: Trip
    totalPrice: number,
}