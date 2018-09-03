FROM node:8-alpine
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]