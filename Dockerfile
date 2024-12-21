# Use a lightweight web server image like Nginx
FROM nginx:alpine

# Copy your HTML files to the web server's default directory
COPY . /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
