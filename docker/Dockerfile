FROM node:12-stretch as builder
WORKDIR /apps/js-api-signature

COPY . .

RUN yarn config set registry http://registry.npm.taobao.org && \
    yarn install && \
    yarn build


FROM node:12-alpine
WORKDIR /apps/js-api-signature

COPY .version .version
COPY --from=builder /apps/js-api-signature/dist /apps/js-api-signature
COPY --from=builder /apps/js-api-signature/node_modules /apps/js-api-signature/node_modules


EXPOSE 3000

CMD ["node", "index.js"]