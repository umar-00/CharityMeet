import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createEventsSlice } from './createEventsSlice';
import { createUserSlice } from './createUserSlice';
import { StoreState } from './storeState';

export const useUserStore = create<StoreState>()(
    devtools((...a) => {
        return {
            ...createUserSlice(...a),
            ...createEventsSlice(...a)
        };
    })
);
