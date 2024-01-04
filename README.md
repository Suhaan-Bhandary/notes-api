# Notes API

## Steps

Setup the postgresql:
createdb notes
\c notes
CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;

createdb notes-test
\c notes-test
CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;

Setup the .env
create a .env.test for test also

Postman link: https://www.postman.com/mission-architect-94960085/workspace/public/collection/16036286-c35b4e2a-074c-4f3d-8a48-61d5bb375b31?action=share&creator=16036286

Used Joi to for validation
Used bycrypt to hash the password
Added SECRET_KEY in the env

Added jwt webtoken to create access token

In Postman update the token before using on local server
