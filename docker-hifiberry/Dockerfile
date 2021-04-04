FROM node:14

#ARG PLATFORM=linux
#ARG GROK_URL=https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-${PLATFORM}.zip

WORKDIR /app
RUN apt-get update
RUN apt-get install -y wget curl

#RUN wget ${GROK_URL}
#RUN unzip -o *.zip && rm -f *.zip

COPY ./src/ .
RUN npm install

EXPOSE 3690
CMD [ "./entrypoint.sh" ]

