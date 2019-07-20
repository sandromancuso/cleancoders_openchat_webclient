#!/bin/sh

docker build -t openchat-frontend .
docker run --rm -itp 5000:5000 openchat-frontend
