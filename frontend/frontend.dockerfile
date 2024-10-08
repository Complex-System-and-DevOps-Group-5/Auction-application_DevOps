
#use the current node image as base.
FROM node:22.9.0-alpine3.19

# Set the working directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install

# Copy the app source code
COPY . .

EXPOSE 5173

# Build the app
RUN npm run build

# Start the app
CMD [ "npm", "run", "dev" ]