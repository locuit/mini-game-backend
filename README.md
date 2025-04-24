# Mini Game Backend System - Mì ăn liền

Backend system for a casual mini game with session-based scoring and leaderboard.

## Features
- Session creation and management
- Score submission
- Recent play history
- Top 20 leaderboard
- Rank checking
- Rate limiting for anti-spam
- MongoDB with indexes for performance
- Weekly leaderboard reset (cron job)

## Prerequisites
- Node.js >= 16.x
- MongoDB
- Yarn (recommended)

## Installation
1. Clone the repository
2. Copy \`.env.example\` to \`.env\` and configure:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   yarn install
   \`\`\`
4. Run MongoDB locally or provide a MongoDB URI
5. Start the server:
   \`\`\`bash
   yarn start:dev
   \`\`\`

## Environment Variables
\`\`\`
MONGODB_URI=mongodb://localhost:27017/mini-game
PORT=3000
NODE_ENV=development
\`\`\`

## API Documentation
API documentation is available via Swagger at \`/api\` endpoint when running in development mode.

##matically reset leaderboard every week using a cron job (via `@nestjs/schedule`).

---

### Additional Setup for Deployment (Optional)

#### 12. **Deploy to Vercel/Railway/Heroku**
If you want to deploy, set up the project for Vercel (as an example):

- Install Vercel CLI:
  ```bash
  npm install -g vercel