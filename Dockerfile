# Start with a builder image
FROM node:21-slim as builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Production build for any needed assets
RUN npm run build

# Production image
FROM node:21-slim
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

CMD ["npm", "start"]
