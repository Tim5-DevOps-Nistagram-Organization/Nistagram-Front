FROM node:13.12.0-alpine AS nistagramFrontTest
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN apk update && apk add --no-cache nginx
RUN apt-get install openjdk-11-jdk
RUN npm install -g sonarqube-scanner
COPY ./ ./