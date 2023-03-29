import { EventsSlice } from "./createEventsSlice";
import { UserSlice } from "./createUserSlice";

export type StoreState = UserSlice & EventsSlice;