import {PeoplePage} from "./pages/people";
import {RoomsPage} from "./pages/rooms";
import {BookingsPage} from "./pages/bookings";


export const routes = [
    {
        page: <PeoplePage />,
        path: '/people',
        key: 'people_page'
    },
    {
        page: <RoomsPage />,
        path: '/rooms',
        key: 'rooms_page'
    },
    {
        page: <BookingsPage />,
        path: '/bookings',
        key: 'bookings_page'
    },
];
