FROM node:16.15.0

COPY ./package*.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

EXPOSE 3000

USER node

CMD [ "yarn", "start" ]
