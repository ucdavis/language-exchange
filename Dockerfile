FROM node:8
WORKDIR /usr/src/app

COPY package.json .
RUN npm install
RUN mkdir client
COPY client/package.json client
RUN (cd client && npm install)
COPY . .
RUN (cd client && npm run-script build)

EXPOSE 5002

CMD [ "npm", "start" ]
