# Event Watcher

Event Watcher is a Node.js/NestJS-based backend application designed to process and monitor events in real-time. It leverages RabbitMQ for message brokering and MongoDB for persistent storage, enabling scalable and efficient event-driven workflows.

---

## Architecture Overview

![Architecture Diagram](arch.jpg)

- **App Instances**: Multiple instances of the Event Watcher app can run concurrently, publishing and consuming events.
- **RabbitMQ**: Acts as the message broker, decoupling producers and consumers, ensuring reliable event delivery.
- **MongoDB**: Stores processed event data for querying and analytics.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/miadabdi/event-watcher.git
   cd event-watcher
   ```

2. **Configure environment variables:**
   - Copy all `.env.example` files to `.env` (for each service/app) and update values as needed:
     ```bash
     cp .env.example .env
     cp apps/auth/.env.example apps/auth/.env
     cp apps/process/.env.example apps/process/.env
     cp apps/agent/.env.example apps/agent/.env
     ```
   - Edit each `.env` to set your RabbitMQ and MongoDB connection details.

---

## Running the Application

### Using Docker Compose (Recommended)

This will start the app, RabbitMQ, and MongoDB together.

```bash
docker compose up --build
```

- The app will be available at `http://localhost:3000` for Auth, and `http://localhost:3001` for process.
- RabbitMQ management UI: `http://localhost:15672` (default user/pass: guest/guest).
- MongoDB: `mongodb://localhost:27017`

---

### Run with Docker Images

You can also run each service using pre-built Docker images. Make sure RabbitMQ and MongoDB are running and accessible.

#### Auth Service

```bash
docker run --network=host \
  -e MONGODB_URI="mongodb://user:pass@mongo/event-watcher" \
  -e JWT_EXPIRES=36000 \
  -e JWT_SECRET=randomsecret \
  -e HTTP_PORT=3001 \
  -e RABBITMQ_URL="amqp://user:pass@rabbitmq:5672" \
  miadabdi/event-watcher-auth:stable-latest
```

#### Process Service

```bash
docker run --network=host \
  -e MONGODB_URI="mongodb://user:pass@mongo/event-watcher" \
  -e RABBITMQ_URL="amqp://user:pass@rabbitmq:5672" \
  miadabdi/event-watcher-process:stable-latest
```

#### Agent Service

```bash
docker run --network=host \
  -e RABBITMQ_URL="amqp://user:pass@rabbitmq:5672" \
  -e AGENT_ID=id \
  -e AGENT_PASSWORD=test \
  miadabdi/event-watcher-agent:stable-latest
```

- Adjust `--network=host` as needed for your environment (or use Docker networks).

---

## Useful Commands

- **Run tests:**
  ```bash
  pnpm run test
  ```
- **Run in production:**
  ```bash
  pnpm run start:prod
  ```

---

## License

MIT
