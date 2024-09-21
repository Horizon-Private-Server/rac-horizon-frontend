# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

RUN npm install chart.js react-chartjs-2 --force

COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]