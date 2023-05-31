# Base image
FROM nginx:alpine

# Copy the static files to the nginx public directory
COPY . /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
