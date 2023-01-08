FROM node:17-alpine as generate-dummy
WORKDIR /usr/src
COPY base.json generateDummyJSON.js ./
RUN node generateDummyJSON.js

FROM mongo:5.0
COPY --from=generate-dummy /usr/src/dummy.json /dummy.json