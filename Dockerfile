# Docker file to build my nest js image

FROM node:lts

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy schema and prism migration. This is neccasary to run prisma migrate deploy.
# https://notiz.dev/blog/prisma-migrate-deploy-with-docker
COPY prisma ./prisma/

# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# Runs the app in dev mode
CMD ["npm", "run" , "start:migrate:prod"]