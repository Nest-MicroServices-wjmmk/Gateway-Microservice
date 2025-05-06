
<<<<<<< HEAD
FROM node:20
=======
FROM node:20-alpine
>>>>>>> 0fcbada1128cdf8fd7d72ffb9bc0dabacc806c5a

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3001