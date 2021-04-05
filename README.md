# ifft-webhooks
ifft-webhooks is a simple webserver and ngrok package to execute pre-defined commands over the web.
This simple yet powerfull system, lets you control any device (laptop, server) remotely using Alexa or other home automation systems.

Using NGROK as reverse system for connections, you don't have to configure any port forwarding rules in your firewall.
On start-up a random URL is generated which you can use to configure your IFFT webhooks.

# docker-[systems]
These are dockerized containers which have been pre-configured to expose webhooks for a certain software platform.

example config (from docker-hifiberry)
```

version: '2.2'
services:
  ifft-webhooks:
    image: edgecrush3r/ifft-hifiberry
    network_mode: bridge
    environment:
      - "IFFT_PORT=3690"
      - "IFFT_VAR_SERVER_ADDRESS=10.0.1.9"
      - "IFFT_SHARED_SECRET=@x102mLY)_!"
      # IFFT_CMD_<YOUR_TRIGGER_NAME>="<YOUR_CMD_HERE>"
      - "IFFT_CMD_PLAY=curl -v -X POST -H 'Content-Type: application/json' http://[SERVER_ADDRESS]:81/api/player/play"
      - "IFFT_CMD_STOP=curl -v -X POST -H 'Content-Type: application/json' http://[SERVER_ADDRESS]:81/api/player/stop"
      - "IFFT_CMD_NEXT=curl -v -X POST -H 'Content-Type: application/json' http://[SERVER_ADDRESS]:81/api/player/next"
      - "IFFT_CMD_PREVIOUS=curl -v -X POST -H 'Content-Type: application/json' http://[SERVER_ADDRESS]:81/api/player/previous"
      - "IFFT_CMD_PAUSE=curl -v -X POST -H 'Content-Type: application/json' http://[SERVER_ADDRESS]:81/api/player/pause"
      - "IFFT_CMD_STATUS=curl -v -X GET -H 'Content-Type: application/json' http://[SERVER_ADDRESS]:81/api/player/status"
      - "IFFT_CMD_VOLUME_DOWN=curl -v -X POST -H 'Content-Type: application/json' -d '{\"percent\":\"-5\"}' http://[SERVER_ADDRESS]:81/api/volume"
      - "IFFT_CMD_VOLUME_UP=curl -v -X POST -H 'Content-Type: application/json' -d '{\"percent\":\"+5\"}' http://[SERVER_ADDRESS]:81/api/volume"
    dns:
      - 8.8.8.8
```

# Using it

1. Build the docker container of choice (cd <docker-foldername> and run the build script
```
cd docker-hifiberry
./build_docker.sh
```
2. Edit the docker-compose file and change custom variables like 'IFFT_VAR_SERVER_ADDRESS' and 'IFFT_SHARED_SECRET'
3. Run the docker-container
```
  docker-compose up -d
```
4. check the logs for the generated webhooks
```
  docker logs docker-hifiberry_ifft-webhooks_1
```

This will show something like:

```
IFFT Webhooks running on port: 3690
IFFT_SHARED_SECRET: @x102mLY)_!

Predifine your own webhook commands in bash/shell using environment variables
	export IFFT_CMD_<YOUR_TRIGGER_NAME>="<YOUR_CMD_HERE>"

Available Webhooks:"
	https://c4be7765d692.ngrok.io/ifft/PREVIOUS?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/STOP?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/STATUS?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/PAUSE?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/VOLUME_DOWN?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/VOLUME_UP?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/NEXT?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/PLAY?shared_secret=@x102mLY)_!
	https://c4be7765d692.ngrok.io/ifft/WEBHOOK_TEST?shared_secret=@x102mLY)_!
```

5. Go to IFFT.com and add the Available Webhooks to your favorite triggers (Alexa, Google etc)

** Note that the URL will be changed everytime the docker container is (re)-launched. 
