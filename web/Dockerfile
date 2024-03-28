FROM node:20-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=3000

RUN npm run build

EXPOSE 3000

CMD [ "http-server", "dist" ]