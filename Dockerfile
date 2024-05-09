FROM node:18-alpine
# 在容器内创建工作目录
WORKDIR /nest-backend
# 下载依赖
COPY package.json package-lock.json /nest-backend
RUN npm i
# 构建项目
COPY . /nest-backend
RUN npm run build
EXPOSE 3000
CMD npm run start:prod