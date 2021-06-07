FROM node:13.12.0-alpine AS nistagramFrontTest
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN apt-get update && apt-get install -y openjdk-11-jdk
RUN npm install -g sonarqube-scanner
COPY ./ ./