FROM node:8.9.3-alpine

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn build

EXPOSE 5000

CMD ["yarn","serve","-s","build"]
