FROM node:13.12.0-alpine AS nistagramFrontTest
RUN apk add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN java -version
RUN ls
ENV JAVA_HOME=/usr/bin/java
ENV PATH=$JAVA_HOME/bin:$PATH
RUN which java
RUN echo $JAVA_HOME
RUN echo $PATH
RUN npm install -g sonarqube-scanner
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./
