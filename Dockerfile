FROM node:20.11.0-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

RUN rm -f /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/habit-tracker/browser /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

