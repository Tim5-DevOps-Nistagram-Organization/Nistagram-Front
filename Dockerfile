FROM node:13.12.0-alpine AS nistagramFrontTest
RUN npm install -g sonarqube-scanner
RUN sonar-scanner
RUN ls -1tr /root/.sonar/native-sonar-scanner/ | head -1
RUN ls -1tr /root/.sonar/native-sonar-scanner/
RUN ls /root/.sonar/native-sonar-scanner/
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' "/root/.sonar/native-sonar-scanner/$(ls -1tr /root/.sonar/native-sonar-scanner/ | head -1)/bin/sonar-scanner"
#/root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./

