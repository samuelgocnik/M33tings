-- Add migration script here
-- create .env file withh database url
-- sqlx migrate add initial
-- docker-compose -f docker-compose.yml create
-- sqlx database create
-- sqlx migrate run

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pwd TEXT NOT NULL,
  picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES users NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE event_address (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES event,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE event_date (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES event,
  proceedings_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);


CREATE TABLE note (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  event_id INTEGER REFERENCES event,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE participant (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  event_id INTEGER REFERENCES event,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);