FROM node:16-alpine AS build
WORKDIR /src/app

# Install Git
RUN apk update && apk add git

# Clone the repository
RUN git clone https://github.com/ashwarya177/AIM-Geocaching.git .

COPY . .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /src/app/dist/aim-geocaching/ /usr/share/nginx/html
EXPOSE 80