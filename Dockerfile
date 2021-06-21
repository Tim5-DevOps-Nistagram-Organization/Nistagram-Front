FROM node:13.12.0-alpine AS nistagramFrontTest

RUN apk add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
ENV PATH=$JAVA_HOME/bin:$PATH

RUN npm install -g sonarqube-scanner \
    sonar-scanner; exit 0 \
    sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' "/root/.sonar/native-sonar-scanner/$(ls -1tr /root/.sonar/native-sonar-scanner/ | head -1)/bin/sonar-scanner" \
    chmod 755  "/root/.sonar/native-sonar-scanner/$(ls -1tr /root/.sonar/native-sonar-scanner/ | head -1)/jre/bin/java"

WORKDIR /app
COPY .package*.json ./
RUN npm install
COPY . .

FROM node:13.12.0-alpine as nistagramFrontRuntime
# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent
# add app
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]