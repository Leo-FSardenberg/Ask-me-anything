CREATE TABLE IF NOT EXISTS rooms (
"id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
"theme" VARCHAR(255)  NOT NULL 
)

---- create above / drop below ----

-- Write your migrate down statements here. If this migration is irreversible
-- Then delete the separator line above.
DROP TABLE IF EXISTS rooms;