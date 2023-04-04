import { AuthError, AuthResponse, PostgrestError } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import { StateCreator } from 'zustand';
import { Charity, CharityToCreate, User } from '../interfaces/User';
import { supabase } from '../supabase/supabaseClient';
import { StoreState } from './storeState';

type navigateToString = string;

export interface UserSlice {
    authenticatedUser: User | null;
    charity: Charity | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void | navigateToString>;
    signupCharity: (
        email: string,
        password: string,
        charityName: string
    ) => Promise<void | navigateToString>;
    signout: () => Promise<void | navigateToString>;
    getUserSessionAndCharity: () => Promise<void | navigateToString>;
}

export const createUserSlice: StateCreator<
    StoreState,
    [['zustand/devtools', never]],
    [],
    UserSlice
> = (set) => ({
    authenticatedUser: null,

    charity: null,

    isLoading: false,

    error: null,

    redirectTo: null,

    login: async (email: string, password: string) => {
        set({ isLoading: true });

        const { error, data } = await supabase.auth.signInWithPassword({
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
            {
                isLoading: false,
                authenticatedUser: { email, user_id: data.user?.id! },
            },
            false,
            'Successfully signed in'
        );
        return '/charity-dashboard/manage';

        // set({ isLoading: false, redirectTo: '/charity-dashboard/manage', user: { email } }, false, "Successfully signed in, redirect to CharityDashboard Manage page");
    },

    signupCharity: async (email: string, password: string, charityName: string) => {
        set({ isLoading: true });

        let error: PostgrestError | AuthError | null = null;
        let data;

        ({ error, data } = await supabase.auth.signUp({ email, password }));

        if (error) {
            console.error(error);
            toast.error(error.message);
            set({ isLoading: false });
            return;
        }

        let newlyCreatedUserId: string = data.user?.id!;

        const charityUpdate: CharityToCreate = {
            name: charityName,
            is_verified: true,
            user_id: newlyCreatedUserId,
        };

        console.log('charityUpdate: ', charityUpdate);

        ({ error } = await supabase.from('charities').insert(charityUpdate));

        if (error) {
            console.error(error);
            toast.error(error.message);

            set({ isLoading: true });

            // delete previously signed in user if postgrestError occurs
            ({ data, error } = await supabase.auth.admin.deleteUser(newlyCreatedUserId));

            if (error) {
                console.error(error);
                toast.error(error.message);

                set({ isLoading: false });
                return;
            }

            set({ isLoading: false });
            return;
        }

        console.log('You have been successfully registered.');
        toast.success('You have been successfully registered.');

        set({ isLoading: false });
        return '/login';
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

        set(
            {
                isLoading: false,
                authenticatedUser: null,
                charity: null,
                events: null,
            },
            false,
            'Successfully logged out'
        );

        // set(
        //     { isLoading: false, redirectTo: '/login', user: null },
        //     false,
        //     'Successfully logged out, redirect to Login page'
        // );
    },

    getUserSessionAndCharity: async () => {
        set({ isLoading: true });

        let data, error;

        ({ data, error } = await supabase.auth.getSession());

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
                authenticatedUser: {
                    email: data.session.user.email!,
                    user_id: data.session.user.id,
                },
            },
            false,
            'User session successfully fetched'
        );
        console.log('getUserSessionAndCharity, auth_user: ', { data, error });

        set({ isLoading: true });

        ({ data, error } = await supabase
            .from('charities')
            .select(`name, is_verified, user_id`)
            .eq('user_id', data.session.user.id)
            .single());

        set(
            {
                isLoading: false,
                charity: {
                    is_verified: data?.is_verified,
                    name: data?.name,
                },
            },
            false,
            'Charity successfully fetched'
        );

        console.log('getUserSessionAndCharity, charity: ', { data, error });

        return;
    },
});
