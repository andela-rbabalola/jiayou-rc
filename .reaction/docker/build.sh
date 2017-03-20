#!/bin/bash

# build the base container and then the app container
docker build -f .reaction/docker/base.dockerfile -t rotimi/jiayou-rc:latest .
docker build -t rotimi/jiayou-rc:latest .
