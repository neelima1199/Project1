# Base stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY apps/dashboard/package*.json ./apps/dashboard/
COPY packages/lumina-ui/package*.json ./packages/lumina-ui/
RUN npm install

# Build stage
COPY . .
RUN npm run build --workspace=dashboard

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=base /app/apps/dashboard/public ./public
COPY --from=base /app/apps/dashboard/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

EXPOSE 3001
CMD ["npm", "start", "--workspace=dashboard"]
