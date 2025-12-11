FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent || true
COPY . .
CMD ["npm","start"]
