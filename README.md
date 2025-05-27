# Electric Pass 🔐

**Electric Pass** is a modern web application designed to streamline event management. Built with a microservices architecture using TypeScript and managed with Nx, this project aims to provide a scalable and efficient solution for EV infrastructure management.

### Why Electric Pass ?

This project empowers developers to build scalable event management systems efficiently. The core features include:

- 🎯 **Efficient Task Management:** Optimize build and lint operations to reduce redundant processing.
- 📦 **Structured Monorepo Architecture:** Facilitate organized development across multiple applications and packages.
- 🗄️ **Robust Database Interaction:** Ensure seamless database operations with Prisma for migrations and schema synchronization.
- 🐳 **Docker Integration:** Orchestrate essential services like Redis and MySQL for a reliable development environment.
- 🎨 **User-Friendly UI Components:** O Leverage reusable components for a cohesive user experience, enhancing engagement and interaction.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express
- **Database**: Mysql
- **ORM**: Prisma
- **Monorepo Management**: Nx
- **Containerization**: Docker, Docker Compose
- **Deployment**: Vercel ([elastic-pass.vercel.app](https://elastic-pass.vercel.app))

## 📁 Project Structure

```
electric-pass/
├── apps/           # Application code
├── packages/       # Shared packages and utilities
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn
- Docker & Docker Compose

1. **Clone the repository**

   ```bash
   git clone https://github.com/ridopurnomo86/electric-pass.git
   cd electric-pass
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Development commands**

   ```bash
   # Format code
   yarn format:code

   # Lint code
   yarn lint

   # Check code
   yarn check:code

   # Build database
   yarn db:build
   ```

## 🐳 Docker Setup

Run the application using Docker:

```bash
docker-compose up
```

## 👤 Author

- **Rido Purnomo**
- Email: ridopurnomo86@gmail.com
- GitHub: [@ridopurnomo86](https://github.com/ridopurnomo86)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

⭐ Star this repository if you find it helpful!
