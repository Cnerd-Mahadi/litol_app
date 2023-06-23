# Welcome to LITOL - An Active Learning Platform!

A project based on the implementation of active learning methods. It includes features like flash card like summary, cornell note taking method, mind mapping and feynman method. 

**Project is still on progress with basic functionalities running. But some of the features might be unavailable**


## Core Technologies

JS, MUI, React, Laravel, React Flow, JWT

## To Run the Project

Run both the backend (server) and the frontend (client) with local database.  

## Run the backend
install the composer for laravel
update the composer file
**composer update**

create the .env file with
**cp .env.example .env**

create a local database and change the config in .env

generate the key with
**php artisan key:generate**

migrate the database table with
**php artisan migrate fresh seed**

run with
**php artisan serve**

## Run the frontend

install all the dependencies with 
**npm install**
run with 
**npm run**
