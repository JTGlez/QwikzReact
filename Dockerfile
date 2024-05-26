# Use Node.js base image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the .env.production file
COPY .env.production .env.production

# Build the React app
RUN npm run build

# Use Nginx base image
FROM nginx:alpine

# Copy built React app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]