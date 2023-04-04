import { StateCreator } from 'zustand'
import { StoreState } from './storeState';
import { Event, EventToCreate, EventToUpdate } from '../interfaces/Event';
import { supabase } from '../supabase/supabaseClient';
import { toast } from 'react-toastify';

export interface EventsSlice {
    events: Event[] | null,
    isLoading: boolean,
    error: string | null,
    getEventsByCharityId: (charity_id: string) => Promise<Event[] | null>,
    getAllEvents: () => Promise<Event[] | null>,
    addEvent: (event: EventToCreate) => Promise<void>,
    updateEvent: (event: EventToUpdate, eventId: number) => Promise<void>,
    deleteEvent: (eventId: number) => Promise<void>,
};

export const createEventsSlice: StateCreator<StoreState, [["zustand/devtools", never]], [], EventsSlice> = (set, get) => ({
    events: null,

    isLoading: false,

    error: null,

    getEventsByCharityId: async (charity_id: string) => {
        set({ isLoading: true });

        let error: any;
        let data: Event[] | null;

        ({ data, error } = await supabase
            .from('events')
            .select(`id, title, address, volunteers_needed, description, created_at, ends_at, charity_id, charity_name`)
            .eq('charity_id', charity_id));

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: false });
            return null;
        }

        console.log('events fetched: ', data);

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
            .select(`id, title, address, volunteers_needed, description, created_at, ends_at, charity_id,charity_name`));

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: false });
            return null;
        }

        console.log('events fetched: ', data);

        set({
            isLoading: false,
            events: data
        }, false, "Events successfully fetched");

        return data;
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
    }
});