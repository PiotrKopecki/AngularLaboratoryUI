#Stage 1
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
ARG configuration=production
RUN npm run build -- --output-path=./dist --configuration $configuration

#Stage 2
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
