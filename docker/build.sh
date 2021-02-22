#!/bin/bash

set -e
ROOT="$(pwd)"
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"
echo $ROOT $DIR
DOCKER_FILE=$DIR/Dockerfile

REGISTRY="registry.cn-hangzhou.aliyuncs.com/wg-common"
IMAGE_NAME="js-sdk-signature"
IMAGE_VERSION=$(node -p -e "require('./package.json').version")
GIT_COMMIT_HASH=$(git rev-parse  --short=6 HEAD | sed 's/[[:blank:]]//g')


if [ ${BUILD_FOR_DEV} ];then
	IMAGE_VERSION=${IMAGE_VERSION}.dev
else
  IMAGE_VERSION=${IMAGE_VERSION}.${GIT_COMMIT_HASH}
fi


echo start build image...

echo $IMAGE_VERSION > .version

docker build ${ROOT} -f ${DOCKER_FILE} -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_VERSION} --force-rm=true

# docker login --username=${DOCKER_LOGIN_USER} --password=${DOCKER_LOGIN_PASSWORD} ${REGISTRY}
# docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_VERSION}
# docker rmi ${REGISTRY}/${IMAGE_NAME}:${IMAGE_VERSION}

