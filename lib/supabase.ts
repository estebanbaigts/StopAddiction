import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type WellnessEntry = {
  id: string;
  user_id: string;
  date: string;
  mood_score: number;
  journal_entry: string;
  evening_reflection: string;
  sleep_quality: number;
  sleep_duration: number;
  activities: string[];
  social_interactions: string;
  memorable_moments: string;
  games_played: Array<{
    name: string;
    duration: number;
    enjoyment: number;
  }>;
  created_at: string;
  updated_at: string;
};

export type WellnessAttachment = {
  id: string;
  entry_id: string;
  file_url: string;
  file_type: string;
  created_at: string;
};