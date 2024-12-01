# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

RUN npx prisma generate

# Build the app
RUN npm run build

# Expose application port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
