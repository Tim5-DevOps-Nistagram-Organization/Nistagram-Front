FROM centos
RUN yum install -y wget java-1.8.0-openjdk zip unzip
RUN echo "JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")" | tee -a /etc/profile && source /etc/profile && echo $JAVA_HOME

FROM node:13.12.0-alpine AS nistagramFrontTest
ARG API="http://localhost:8080/"
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN npm install -g sonarqube-scanner
COPY ./ ./