# STAGE 1: Build the static frontend files
FROM node:20-alpine AS build
WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all remaining source files
COPY . .

# Run the build
RUN npm run build

# STAGE 2: Serve the files using Nginx
FROM nginx:alpine

# The build output directory varies by framework:
# - React/Vite often use 'dist'
# - Create-React-App uses 'build'
# - Angular uses 'dist/your-app-name'
# Check your local 'backend' folder after running 'npm run build' to confirm.
# I am using 'dist' as it is the most common modern standard.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
