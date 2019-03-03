FROM node:10-alpine
ARG NODE_ENV
RUN mkdir -p /srv/app/server/node_modules
WORKDIR /srv/app/server
COPY package.json yarn.lock ./
RUN yarn
RUN yarn audit
ENTRYPOINT [ "yarn" ]
CMD [ "start" ]
