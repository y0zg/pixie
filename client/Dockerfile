FROM node:10-alpine
ARG NODE_ENV
RUN mkdir -p /srv/app/client/node_modules
WORKDIR /srv/app/client
COPY package.json yarn.lock ./
RUN yarn --audit
ENTRYPOINT [ "yarn" ]
CMD [ "start" ]
