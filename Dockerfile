FROM node:13.12.0-alpine AS nistagramFrontTest
RUN apk add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN java -version
RUN ls
RUN ls /usr; exit 0
RUN ls /usr/lib; exit 0
RUN ls /usr/lib/jvm; exit 0
RUN ls -1tr /usr/lib/jvm/ | head -1; exit 0
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
ENV PATH=$JAVA_HOME/bin:$PATH
RUN which java
RUN echo $JAVA_HOME
RUN echo $PATH
RUN npm install -g sonarqube-scanner
RUN sonar-scanner; exit 0
RUN ls -1tr /root/.sonar/native-sonar-scanner/ | head -1
RUN ls -1tr /root/.sonar/native-sonar-scanner/
RUN ls /root/.sonar/native-sonar-scanner/
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' "/root/.sonar/native-sonar-scanner/$(ls -1tr /root/.sonar/native-sonar-scanner/ | head -1)/bin/sonar-scanner"
#/root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner
RUN chmod 755  "/root/.sonar/native-sonar-scanner/$(ls -1tr /root/.sonar/native-sonar-scanner/ | head -1)/jre/bin/java"
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./

