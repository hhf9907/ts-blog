# FROM 表示设置要制作的镜像基于哪个镜像，FROM指令必须是整个Dockerfile的第一个指令，如果指定的镜像不存在默认会自动从Docker Hub上下载。
# 指定我们的基础镜像是node，latest表示版本是最新
FROM node:latest

# 定义工作目录
WORKDIR /usr/src/app

# 将本地代码复制到工作目录内
COPY ./ ./

RUN npm install yarn -g

RUN yarn install

# 安装 pm2
RUN npm install pm2 -g

# 启动服务
CMD pm2-runtime 'yarn start'