FROM node:20.11.0-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=build /app/habit-tracker/ /usr/share/nginx/html

EXPOSE 4201

