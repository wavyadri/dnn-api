-- \i ../dnn-api/db/01_schema.sql 

-- DROP DATABASE IF EXISTS dnn;
-- CREATE DATABASE dnn;

DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  date DATE NOT NULL,
  views INT DEFAULT 0
)