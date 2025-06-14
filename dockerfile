FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


EXPOSE 3000


CMD ["npx", "tsx", "src/app.ts"]