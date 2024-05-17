# Use the official Node.js 14 image as base
FROM node:20

# Set the working directory inside the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files to the working directory
COPY . .

# Expose port if your application listens on a specific port
# EXPOSE <port>

# Define the command to run your application
CMD ["npm", "start"]
