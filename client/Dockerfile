FROM node:20-alpine AS BUILDER

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=BUILDER /app/dist /var/www/html
