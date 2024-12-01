# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

COPY wait-for-it.sh /usr/local/bin/wait-for-it

RUN chmod +x /usr/local/bin/wait-for-it

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose application port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]