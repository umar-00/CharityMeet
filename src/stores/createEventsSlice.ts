import { StateCreator } from 'zustand'
import { StoreState } from './storeState';

export interface EventsSlice {
    events: number,
    isLoading: boolean,
    error: string | null,
    getEvents: () => void
};

export const createEventsSlice: StateCreator<StoreState, [["zustand/devtools", never]], [], EventsSlice> = (set) => ({
    events: 0,
    isLoading: false,
    error: null,
    getEvents: async () => {
        try {
            set({ isLoading: true });
            // const response = await getEvents();
            // set({ isLoading: false, events: response.data });
        }
        catch (err: any) {
            set({ error: err.message, isLoading: false })
        }
    }
});