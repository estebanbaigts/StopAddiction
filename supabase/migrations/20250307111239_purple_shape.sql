/*
  # Wellness Tracking System Schema

  1. New Tables
    - `wellness_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (date)
      - `mood_score` (integer, 1-10)
      - `journal_entry` (text)
      - `evening_reflection` (text)
      - `sleep_quality` (integer, 1-5)
      - `sleep_duration` (integer, minutes)
      - `activities` (jsonb)
      - `social_interactions` (text)
      - `memorable_moments` (text)
      - `games_played` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `wellness_attachments`
      - `id` (uuid, primary key)
      - `entry_id` (uuid, references wellness_entries)
      - `file_url` (text)
      - `file_type` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create wellness_entries table
CREATE TABLE wellness_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  mood_score integer CHECK (mood_score >= 1 AND mood_score <= 10),
  journal_entry text,
  evening_reflection text,
  sleep_quality integer CHECK (sleep_quality >= 1 AND sleep_quality <= 5),
  sleep_duration integer,
  activities jsonb DEFAULT '[]'::jsonb,
  social_interactions text,
  memorable_moments text,
  games_played jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, date)
);

-- Create wellness_attachments table
CREATE TABLE wellness_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid REFERENCES wellness_entries ON DELETE CASCADE,
  file_url text NOT NULL,
  file_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE wellness_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_attachments ENABLE ROW LEVEL SECURITY;

-- Create policies for wellness_entries
CREATE POLICY "Users can create their own entries"
  ON wellness_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own entries"
  ON wellness_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries"
  ON wellness_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own entries"
  ON wellness_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for wellness_attachments
CREATE POLICY "Users can view their own attachments"
  ON wellness_attachments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM wellness_entries
    WHERE wellness_entries.id = wellness_attachments.entry_id
    AND wellness_entries.user_id = auth.uid()
  ));

CREATE POLICY "Users can create attachments for their entries"
  ON wellness_attachments
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM wellness_entries
    WHERE wellness_entries.id = entry_id
    AND wellness_entries.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own attachments"
  ON wellness_attachments
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM wellness_entries
    WHERE wellness_entries.id = wellness_attachments.entry_id
    AND wellness_entries.user_id = auth.uid()
  ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_wellness_entries_updated_at
  BEFORE UPDATE ON wellness_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();