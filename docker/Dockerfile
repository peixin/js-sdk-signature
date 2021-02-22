FROM node:12-stretch as builder
WORKDIR /apps/js-sdk-signature

COPY . .

RUN yarn config set registry http://registry.npm.taobao.org && \
    yarn install && \
    yarn build


FROM node:12-alpine
WORKDIR /apps/js-sdk-signature

COPY .version .version
COPY --from=builder /apps/js-sdk-signature/dist /apps/js-sdk-signature
COPY --from=builder /apps/js-sdk-signature/node_modules /apps/js-sdk-signature/node_modules


EXPOSE 3000

CMD ["node", "index.js"]