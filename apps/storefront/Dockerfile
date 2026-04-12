# Base stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY apps/storefront/package*.json ./apps/storefront/
COPY packages/lumina-ui/package*.json ./packages/lumina-ui/
COPY packages/ai-core/package*.json ./packages/ai-core/
RUN npm install

# Build stage
COPY . .
RUN npm run build --workspace=storefront

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=base /app/apps/storefront/public ./public
COPY --from=base /app/apps/storefront/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start", "--workspace=storefront"]
