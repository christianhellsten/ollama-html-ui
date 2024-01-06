# Use the official Caddy image
FROM caddy:2-alpine

# Set the working directory inside the container
WORKDIR /srv

# Copy Caddyfile and content from the local 'dist' folder to the working directory
COPY Caddyfile.docker /etc/caddy/Caddyfile
COPY dist /srv

# Expose port 80 and 443 for HTTP and HTTPS traffic
EXPOSE 80
EXPOSE 443

# Set Caddy to run as the default command
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
