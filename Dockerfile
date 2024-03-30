FROM node:21.6.2-alpine3.19 as base

RUN apk add --no-cache --upgrade bash curl;
