FROM docker:18-dind  AS nistagramFrontTest
RUN echo "1"
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk --no-cache add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN apk update
RUN apk add awscli nodejs nodejs-npm wget unzip jq openjdk11
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873.zip
RUN unzip sonar-scanner-cli-4.2.0.1873.zip
RUN ls sonar-scanner-4.2.0.1873
ENV PATH="/sonar-scanner-4.2.0.1873/bin:${PATH}"
RUN which java
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"
RUN echo $PATH
RUN java --version
RUN ls /sonar-scanner-4.2.0.1873/bin
RUN sonar-scanner --help

#FROM node:13.12.0-alpine AS nistagramFrontTest
#ARG API="http://localhost:8080/"
#COPY ./package.json ./
#COPY ./package-lock.json ./
#RUN npm install
#ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
#ENV PATH="$JAVA_HOME/bin:${PATH}"
#RUN echo $PATH
#RUN npm install -g sonarqube-scanner
#COPY ./ ./