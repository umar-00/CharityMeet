import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StateCreator } from 'zustand';
import { User } from '../interfaces/User';
import { supabase } from '../supabase/supabaseClient';
import { StoreState } from './storeState';

type navigateToString = string;

export interface UserSlice {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (
        email: string,
        password: string
    ) => Promise<void | navigateToString>;
    signup: (
        email: string,
        password: string
    ) => Promise<void | navigateToString>;
    signout: () => Promise<void | navigateToString>;
    getUser: () => Promise<void | navigateToString>;
}

export const createUserSlice: StateCreator<
    StoreState,
    [['zustand/devtools', never]],
    [],
    UserSlice
> = (set) => ({
    user: null,

    isLoading: false,

    error: null,

    redirectTo: null,

    login: async (email: string, password: string) => {
        set({ isLoading: true });

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error(error.message);
            toast.error(error.message);
            return;
        }

        console.log('Successfully signed in.');
        toast.success('Successfully signed in.');

        set(
            { isLoading: false, user: { email } },
            false,
            'Successfully signed in'
        );
        return '/charity-dashboard/manage';

        // set({ isLoading: false, redirectTo: '/charity-dashboard/manage', user: { email } }, false, "Successfully signed in, redirect to CharityDashboard Manage page");
    },

    signup: async (email: string, password: string) => {
        set({ isLoading: true });

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error(error.message);
            toast.error(error.message);
            return;
        }

        console.log('You have been successfully registered.');
        toast.success('You have been successfully registered.');

        set({ isLoading: false });
        // set({ isLoading: false, redirectTo: '/login' });
    },

    signout: async () => {
        set({ isLoading: true });

        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error(error.message);
            console.error(error.message);
            return;
        }

        toast.success('Successfully logged out.');

        set({ isLoading: false, user: null }, false, 'Successfully logged out');

        // set(
        //     { isLoading: false, redirectTo: '/login', user: null },
        //     false,
        //     'Successfully logged out, redirect to Login page'
        // );
    },

    getUser: async () => {
        set({ isLoading: true });

        const { data, error } = await supabase.auth.getSession();

        if (error) {
            toast.error(error.message);

            set({ isLoading: false, error: error.message });
            return;
        }

        if (!data.session) {
            set({ isLoading: false }, false, 'Not logged in');

            // set(
            //     { isLoading: false, redirectTo: '/login' },
            //     false,
            //     'Not logged in, redirect to Login page'
            // );

            // console.log('from zustand store, redirectTo: ', get().redirectTo);
            // toast.error(
            //     'You must be logged in to use this application. Redirecting to login'
            // );
            return;
        }

        set(
            {
                isLoading: false,
                user: { email: data.session?.user.email! },
            },
            false,
            'User successfully fetched'
        );
        console.log('getSession from useUserStore: ', { data, error });
        return;
    },
});
