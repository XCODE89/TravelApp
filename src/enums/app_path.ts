export enum AppPath  {
    HOME= '/',
    SIGNIN= '/sign-in',
    SIGNUP= '/sign-up',
    TRIP= '/trip/:tripId',
    BOOKING= '/bookings',
    ANY= '*'
}

export enum AppFetch {
    AUTH = '/auth',
    TRIPS = '/trips',
    BOOKING = '/bookings'
}