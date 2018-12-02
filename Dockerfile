FROM node:10-alpine

RUN mkdir -p /build
COPY . /build
WORKDIR /build
RUN yarn install --no-lockfile --production && \
	yarn build

FROM node:10-alpine
RUN mkdir -p /app && \
	chown node:node /app

WORKDIR /app
COPY --from=0 /build/public public
COPY server .
RUN yarn install --no-lockfile
USER node

CMD [ "sh", "-c", "yarn start" ]
