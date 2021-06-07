FROM node:13.12.0-alpine AS nistagramFrontTest
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN apk add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN npm install -g sonarqube-scanner
COPY ./ ./