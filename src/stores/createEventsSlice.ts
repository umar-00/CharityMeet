import { StateCreator } from 'zustand'
import { StoreState } from './storeState';
import { Event, EventToCreate, EventToUpdate, EventAddress } from '../interfaces/Event';
import { supabase } from '../supabase/supabaseClient';
import { toast } from 'react-toastify';
import { Google_Map_Default_Center } from '../components/VolunteerDashboard/Main/Map/Map';
import { distanceBetweenTwoPointsInKm } from '../utils/calculateDistanceBetweenTwoPoints';

export interface EventsSlice {
    events: Event[] | null,
    filteredEvents: Event[] | null,
    isLoading: boolean,
    error: string | null,
    currentlySelectedEvent: { id: number, lat: number, lng: number } | null,
    currentlySelectedAddress: EventAddress,
    searchRadiusInMeters: number,

    getEventsByCharityId: (charity_id: string) => Promise<Event[] | null>,
    getAllEvents: () => Promise<void>,
    addEvent: (event: EventToCreate) => Promise<void>,
    updateEvent: (event: EventToUpdate, eventId: number) => Promise<void>,
    deleteEvent: (eventId: number) => Promise<void>,
    setCurrentlySelectedEvent: (eventId: number, lat: number, lng: number) => void;
    removeCurrentlySelectedEvent: () => void;
    // setSingleEventDistanceFromAddress: (eventId: number) => void;
    setAllEventsDistanceFromAddress: () => void;
    setCurrentlySelectedAddress: (newAddress: EventAddress) => void;
    setSearchRadiusInMeters: (newDistanceInMeters: number) => void;
    setFilteredEventsWithinSearchRadius: () => void;
};

export const createEventsSlice: StateCreator<StoreState, [["zustand/devtools", never]], [], EventsSlice> = (set, get) => ({
    events: null,

    filteredEvents: null,

    isLoading: false,

    error: null,

    currentlySelectedAddress: {
        description: "Constructor University, Campus Ring, Bremen, Germany",
        lat: 53.1670277,
        lng: 8.6516237
    },

    currentlySelectedEvent: null,

    searchRadiusInMeters: 10000,

    getEventsByCharityId: async (charity_id: string) => {
        set({ isLoading: true });

        let error: any;
        let data: Event[] | null;

        ({ data, error } = await supabase
            .from('events')
            .select(`id, title, address, volunteers_needed, description, created_at, ends_at, charity_id, charity_name`)
            .eq('charity_id', charity_id)
            .order('title', { ascending: true }));

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: false });
            return null;
        }

        // console.log('events fetched: ', data);

        set({
            isLoading: false,
            events: data
        }, false, "Events successfully fetched");

        return data;
    },

    getAllEvents: async () => {
        set({ isLoading: true });

        let error: any;
        let data: Event[] | null;

        ({ data, error } = await supabase
            .from('events')
            .select(`id, title, address, volunteers_needed, description, created_at, ends_at, charity_id,charity_name`)
            .order('title', { ascending: true }));

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: false });
            return;
        }

        // console.log('events fetched: ', data);

        set({
            isLoading: false,
            events: data
        }, false, "Events successfully fetched");

        get().setAllEventsDistanceFromAddress();

        get().setFilteredEventsWithinSearchRadius();

        return;
    },

    addEvent: async (event) => {
        set({ isLoading: true });

        console.log('addEvent, event to be added: ', event);

        let error: any;
        let data: Event[] | null;

        ({ data, error } = await supabase
            .from('events')
            .insert(event)
            .select()
        )

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: false });
            return;
        }

        console.log('event inserted: ', data);

        set({
            isLoading: false,
            events: [...get().events!, data![0]]
        }, false, "New event added");

        toast.success('New event successfully created.');

        return;
    },

    updateEvent: async (event, eventId) => {
        set({ isLoading: true });

        console.log('editEvent, event to be updated: ', event);

        let error: any;
        let data: Event[] | null;

        ({ data, error } = await supabase
            .from('events')
            .update(event)
            .eq('id', eventId)
            .select()
        )

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: false });
            return;
        }

        console.log('event updated: ', data);

        const updatedEvents: Event[] = get().events!
            .map(e => {
                if (e.id === eventId) {
                    e.address = event.address;
                    e.created_at = event.created_at;
                    e.description = event.description;
                    e.ends_at = event.ends_at;
                    e.title = event.title;
                    e.volunteers_needed = event.volunteers_needed;
                }

                return e;
            });
        console.log('updatedEvents after mapping: ', updatedEvents);

        set({
            isLoading: false,
            events: updatedEvents
        }, false, "Event updated");

        toast.success('Event successfully updated.');

        return;
    },

    deleteEvent: async (eventId) => {
        set({ isLoading: true });

        console.log('editEvent, event to be updated: ', event);

        let error: any;

        ({ error } = await supabase
            .from('events')
            .delete()
            .eq('id', eventId)
            .select()
        )

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: false });
            return;
        }

        const eventsAfterDeletion = get().events?.filter(e => e.id !== eventId);

        console.log('events remaining after delete: ', eventsAfterDeletion);

        set({
            isLoading: false,
            events: eventsAfterDeletion
        }, false, "Event deleted");

        toast.success('Event successfully deleted.');

        return;
    },

    setCurrentlySelectedEvent: (eventId, lat, lng) => {

        console.log('from setCurrentlySelectedEvent: ', { newEventId: eventId, idAlreadyInState: get().currentlySelectedEvent?.id })

        // Needed to add this to prevent currentlySelectedEvent from being set twice, once due to a click on an event (listItem or Google Map Marker) and the second time due to a useEffect being triggered in VolunteerDashboard component due to change in searchParams which then also tries to change this state property.
        if (get().currentlySelectedEvent?.id === eventId) {
            return;
        }

        set({
            currentlySelectedEvent: { id: eventId, lat, lng }
        }, false, "Set Currently Selected Event");
    },

    removeCurrentlySelectedEvent: () => {
        set({
            currentlySelectedEvent: null
        }, false, "Remove Currently Selected Event");
    },

    // setSingleEventDistanceFromAddress: (eventId: number) => {
    //     let addressCoordinates: google.maps.LatLngLiteral;
    //     let address = get().currentlySelectedAddress;

    //     if (get().currentlySelectedAddress) {
    //         addressCoordinates = {
    //             lat: address?.lat!,
    //             lng: address?.lng!
    //         }
    //     }
    //     else {
    //         addressCoordinates = Google_Map_Default_Center;
    //     }

    //     const eventToUpdate = get().events?.find(event => event.id === eventId);

    //     let distance = distanceBetweenTwoPointsInKm(addressCoordinates, {
    //         lat: eventToUpdate?.address?.lat!,
    //         lng: eventToUpdate?.address?.lng!,
    //     });

    //     console.log('setEventDistanceFromAddress: ', { addressCoordinates, eventToUpdate });

    //     const updatedEvents = get().events?.map(event => {
    //         if (event.id === eventId) {
    //             return {
    //                 ...event,
    //                 distanceToAddressInKiloMeters: distance
    //             }
    //         }
    //         else return event
    //     });


    //     set({
    //         events: updatedEvents
    //     }, false, "Set Event Distance From Address");
    // },

    setAllEventsDistanceFromAddress: () => {
        let addressCoordinates: google.maps.LatLngLiteral;
        let address = get().currentlySelectedAddress;

        if (get().currentlySelectedAddress) {
            addressCoordinates = {
                lat: address?.lat!,
                lng: address?.lng!
            }
        }
        else {
            addressCoordinates = Google_Map_Default_Center;
        }

        // console.log('setEventDistanceFromAddress, address: ', address);

        const updatedEvents = get().events?.map(event => {
            return {
                ...event,
                distanceToAddressInKiloMeters: distanceBetweenTwoPointsInKm(addressCoordinates, {
                    lat: event.address?.lat!,
                    lng: event.address?.lng!,
                })
            }
        });


        set({
            events: updatedEvents
        }, false, "Set All Event's Distance From Address");
    },

    setCurrentlySelectedAddress: (newAddress) => {
        set({
            currentlySelectedAddress: newAddress
        }, false, "Set Currently Selected Address");

        get().setAllEventsDistanceFromAddress();
        get().setFilteredEventsWithinSearchRadius();
    },

    setSearchRadiusInMeters: (newDistanceInMeters) => {
        set({
            searchRadiusInMeters: newDistanceInMeters
        }, false, "Set Search Radius In Meters");

        get().setFilteredEventsWithinSearchRadius();
    },

    setFilteredEventsWithinSearchRadius: () => {
        const filteredEvents = get().events?.filter(event => event.distanceToAddressInKiloMeters! < (get().searchRadiusInMeters / 1000));

        // console.log('filtered events: ', filteredEvents);

        set({
            filteredEvents
        }, false, "Set Filtered Events Within Search Radius");
    }
});