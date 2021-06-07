FROM node:alpine

ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk/jre

FROM node:13.12.0-alpine AS nistagramFrontTest
ARG API="http://localhost:8080/"
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN npm install -g sonarqube-scanner
ENV PATH $PATH:/sonar-scanner/bin:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin
COPY ./ ./