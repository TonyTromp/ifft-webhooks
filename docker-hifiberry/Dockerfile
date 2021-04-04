FROM node:14

WORKDIR /app
RUN apt-get update
RUN apt-get -y wget curl

RUN wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080

CMD [ "node", "server.js" ]

