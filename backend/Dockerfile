FROM node
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . /backend/
EXPOSE 3600
CMD [ "npm" ,"start"]
