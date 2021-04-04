#!/bin/bash

# Linx
# PLATFORM='linux-amd64'
#
# OSX
PLATFORM='darwin-amd64'
#
# ARM/Raspberry
# PLATFORM='linux-arm'


IMAGE_NAME='edgecrush3r/ifft-hifiberry'
docker build --build-arg PATFORM=${PLATFORM}  -f Dockerfile -t ${IMAGE_NAME} .

