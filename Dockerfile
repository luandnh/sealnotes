# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally for the build process
RUN npm install -g pnpm

# Copy only dependency files for faster build cache
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Copy example environment file (if needed)
RUN cp .env.example .env

# Build the Next.js application
RUN pnpm next build

# Stage 2: Prepare the production image
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm globally for runtime (if needed)
RUN npm install -g pnpm

# Set environment variable for production
ENV NODE_ENV=production

# Create a non-root user and group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Restrict .env file permissions for security
RUN chmod 600 .env

# Change ownership of all files to the non-root user
RUN chown -R appuser:appgroup /app

# Expose the application port
EXPOSE 3000

# Add a healthcheck to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Switch to the non-root user for running the application
USER appuser

# Start the Next.js application
CMD ["pnpm", "next", "start"]
