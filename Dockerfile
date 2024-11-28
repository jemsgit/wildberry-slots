# Step 1: Use a lightweight Node.js image to build the app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Define build argument
ARG VITE_WS_BASE_URL

# Set environment variable for the build process
ENV VITE_WS_BASE_URL=$VITE_WS_BASE_URL

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the app source and build it
COPY . .
RUN yarn build

# Step 2: Use a lightweight Nginx image to serve the app
FROM nginx:stable-alpine

# Remove default Nginx static files and copy the React app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]