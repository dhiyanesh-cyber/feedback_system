FROM node:22

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

ENV VITE_API_BASE_URL=http://localhost:3000/api

CMD ["npm", "run", "dev", "--", "--host"]