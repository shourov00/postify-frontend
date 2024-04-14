FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

RUN npm install -g @angular/cli@17.3.4

CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check"]
