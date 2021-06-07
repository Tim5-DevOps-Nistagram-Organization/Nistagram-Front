FROM node:13.12.0-alpine AS nistagramFrontTest
RUN npm install -g sonarqube-scanner
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g'"/root/.sonar/native-sonar-scanner/$(ls -1tr /root/.sonar/native-sonar-scanner/ | head -1)/bin/sonar-scanner"
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./

