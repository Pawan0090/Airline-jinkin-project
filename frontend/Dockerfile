# STAGE 1: Build the static frontend files
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend source files and build the production bundle
COPY . .
RUN npm run build

# STAGE 2: Serve the files using Nginx
FROM nginx:alpine

# Copy the build output from Stage 1 into the Nginx public folder
# Note: Some frameworks output to 'dist/', others to 'build/'. Check your framework output!
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
