FROM maven:3.8.1-jdk-11 AS nistagramFrontTest
ARG STAGE=test
WORKDIR /usr/src/server
COPY . .
