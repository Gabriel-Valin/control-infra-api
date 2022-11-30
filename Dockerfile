FROM node:18.12.0

WORKDIR /usr/control-infra-api

COPY package*.json /usr/control-infra-api/

RUN npm ci

EXPOSE 1337

COPY . .

run chmod +x /usr/control-infra-api/shs/**/**.sh

CMD ["npm", "run", "start"]