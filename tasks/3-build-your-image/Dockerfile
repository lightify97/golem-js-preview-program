FROM node:20.8-alpine3.17
WORKDIR /golem/work
VOLUME /golem/vol
COPY generator.mjs /golem/work/generator.mjs
RUN npm init -y
RUN npm install commander