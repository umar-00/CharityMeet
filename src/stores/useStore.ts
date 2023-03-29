import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createEventsSlice } from './createEventsSlice';
import { createUserSlice } from './createUserSlice';
import { StoreState } from './storeState';

export const useStore = create<StoreState>()(
    devtools((...a) => {
        return {
            ...createUserSlice(...a),
            ...createEventsSlice(...a)
        };
    })
);
