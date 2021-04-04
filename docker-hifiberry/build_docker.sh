#!/bin/bash

# PLATFORM='linux-amd64', PLATFORM=darwin-amd64, PLATFORM='linux-arm'
# ARM/raspberry
PLATFORM='linux-arm'

IMAGE_NAME='edgecrush3r/ifft-hifiberry'
CURR_FOLDER=${PWD}
cd .. && docker build --no-cache --build-arg PLATFORM=${PLATFORM}  -f ${CURR_FOLDER}/Dockerfile -t ${IMAGE_NAME} .
#cd .. && docker build --build-arg PLATFORM=${PLATFORM}  -f ${CURR_FOLDER}/Dockerfile -t ${IMAGE_NAME} .

