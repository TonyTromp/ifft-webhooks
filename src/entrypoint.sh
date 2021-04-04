#!/bin/bash

if [[ -v IFFT_PORT ]];
then
  IFFT_PORT=3690
fi

node server.js
