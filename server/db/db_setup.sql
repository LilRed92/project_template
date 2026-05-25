-- This is a generic schema setup file.
-- You can use this to initialize your database for a new project.
-- It is an alternative to restoring from the .sql dump file.

CREATE TABLE IF NOT EXISTS metadata (
	id SERIAL PRIMARY KEY,
	metadata_name VARCHAR(100) NOT NULL,
	emoji VARCHAR(10) NOT NULL DEFAULT '🎉',
	color VARCHAR(7) NOT NULL DEFAULT '#3498DB'
);

CREATE TABLE IF NOT EXISTS items (
	id SERIAL PRIMARY KEY,
	item_name VARCHAR(255) NOT NULL,
    metadata_id INTEGER REFERENCES metadata(id),
    description TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO metadata (metadata_name, emoji, color) VALUES
    ('Category A', '🎶', '#6200b2'),
    ('Category B', '🥅', '#fc9f00'),
	('Category C', '🎮', '#e20000'),
    ('Other', '🎉', '#3498DB');

-- Create indexes for performance
CREATE INDEX idx_items_metadata_id ON items(metadata_id);
CREATE INDEX idx_is_favorite ON items(is_favorite);
CREATE INDEX idx_item_name ON items USING gin(to_tsvector('english', item_name));
