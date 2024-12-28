drop table if exists bio_data;

CREATE TABLE bio_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME NOT NULL,
    height TEXT NOT NULL,
    mangalik BOOLEAN,
    devak_gotra TEXT NOT NULL,
    caste_subcaste TEXT NOT NULL,
    marital_status TEXT,
    complexion TEXT,
    education_details TEXT,
    occupation TEXT NOT NULL,
    hobbies TEXT,
    gender TEXT NOT NULL,
    phone_number TEXT,
    email TEXT UNIQUE NOT NULL,
    city TEXT,
    state TEXT,
    user_id uuid references profiles (id) on delete cascade not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX ON bio_data (email);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_trigger
BEFORE UPDATE ON bio_data
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();