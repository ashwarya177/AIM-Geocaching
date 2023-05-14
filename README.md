# AIMGeocaching
Geocaching is an outdoor activity where participants use a GPS receiver or mobile device to locate “caches” which are usually weather resistant containers with various objects hidden inside. Upon finding a cache, the participant records the find online, or signs a logbook that is sometimes kept in the cache. This repo contains the frontend of a web based mobile application for a subset of the traditional geocaching experience.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Prerequisites

Before running the application, ensure that you have the following software installed on your machine:

- Node.js: [link to download](https://nodejs.org/)
- Angular CLI: [link to installation guide](https://angular.io/cli)

## Getting Started

Follow these steps to get the Angular app up and running:

1. Clone the repository: git clone https://github.com/ashwarya177/AIM-Geocaching.git
2. Navigate to the project directory: cd Aim-Geocaching
3. Install the dependencies: npm install
4. Start the development server: Run `ng serve` for a dev server. 
5. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Configuration
The application can be configured using the following variables in /src/constants.ts file:

1. APIUrl: The URL of the backend API. By default, it is set to https://localhost:7152/api. 

   Modify this value if your API is hosted elsewhere.

2. Use your Google Maps API key in '/src/index.html' to acces the Map component of this app upon running.

   Replace the 'YOUR_KEY_GOES_HERE' with your actual key.

   You can get more info on how to create one here - https://developers.google.com/maps/documentation/javascript/get-api-key

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Docker Image
Get the Docker Image of this app at - https://hub.docker.com/repository/docker/ashwarya308/aimgeocachingfrontend/general
