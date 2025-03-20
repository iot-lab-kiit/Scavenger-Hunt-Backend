FROM node:slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3300
USER node
CMD ["yarn", "dev"]
