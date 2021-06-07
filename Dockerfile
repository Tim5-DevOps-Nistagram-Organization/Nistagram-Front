FROM node:13.12.0-alpine AS nistagramFrontTest
ARG API="http://localhost:8080/"
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"
RUN echo $PATH
RUN npm install -g sonarqube-scanner
COPY ./ ./