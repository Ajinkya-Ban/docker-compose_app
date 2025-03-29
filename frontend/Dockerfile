FROM node:20.9.0-alpine

WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

RUN npm install

# Now copy the rest of the app
COPY . .

EXPOSE 5173
ENV NODE_ENV=development

CMD ["npm", "run", "dev","--", "--host"]
