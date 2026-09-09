-- Heroes: UInt8 in source (0-255) -> smallint is more than enough
CREATE TABLE IF NOT EXISTS heroes (
    id smallint PRIMARY KEY,
    name text NOT NULL
);

-- Items: UInt32 ids/costs can exceed Postgres' signed int4 range (2,147,483,647),
-- so id and cost use bigint to safely hold the full UInt32 range (up to ~4.29B).
CREATE TABLE IF NOT EXISTS items (
    id bigint PRIMARY KEY,
    name text NOT NULL,
    tier smallint,
    type text NOT NULL CHECK (type IN ('ability', 'upgrade', 'unknown')),
    slot_type text CHECK (slot_type IN ('weapon', 'vitality', 'spirit')),
    cost bigint
);
