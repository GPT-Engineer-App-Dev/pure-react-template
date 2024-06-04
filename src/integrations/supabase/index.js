import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Dishes // table: dishes
    id: number
    created_at: string
    name: string
    country: string
    size: string
    type: string
    price: number

Drinks // table: drinks
    id: number
    created_at: string
    name: string
    percentage: number
    country: string

Animals // table: animals
    id: number
    created_at: string
    name: string
    type: string
    size: string
    country_of_origin: string
    average_lifetime: string

*/



// Function to list all tables
export const listTables = async () => {
    const { data, error } = await supabase.from('pg_tables').select('tablename');
    if (error) throw new Error(error.message);
    return data;
};