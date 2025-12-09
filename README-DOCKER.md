# Docker Deployment Guide

Complete guide for running the Bank Dashboard application with Docker.

## 📋 Prerequisites

- Docker (version 20.10 or later)
- Docker Compose (version 2.0 or later)

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
cd /path/to/your/project
```

### 2. Set Up Environment Variables

#### Backend (.env)
Create or update `/bank-dashboard-server/.env` with:

```env
APP_NAME="Bank Dashboard API"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=bank_dashboard
DB_USERNAME=root
DB_PASSWORD=secret

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:3000
SESSION_DOMAIN=localhost
```

> **Note**: Generate an APP_KEY by running: `php artisan key:generate`

#### Frontend (.env)
Create or update `/bank-dashboard/.env` with:

```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Build and Start Services

Navigate to the `bank-dashboard` directory:

```bash
cd bank-dashboard
```

**For Production Build:**
```bash
docker-compose up -d
```

**For Development (with hot reload):**
```bash
docker-compose --profile dev up -d frontend-dev backend mysql
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Backend (via nginx)**: http://localhost:8080
- **MySQL**: localhost:3306

---

## 📦 Services Overview

| Service | Port | Description |
|---------|------|-------------|
| `frontend` | 5173 | Production React app (nginx) |
| `frontend-dev` | 5174 | Development server with hot reload |
| `backend` | 8000 | Laravel API (PHP built-in server) |
| `nginx-backend` | 8080 | Laravel via nginx + PHP-FPM |
| `mysql` | 3306 | MySQL database |

---

## 🛠️ Common Commands

### Start Services
```bash
# Start all production services
docker-compose up -d

# Start development services
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database data)
docker-compose down -v
```

### Rebuild Services
```bash
# Rebuild all images
docker-compose build

# Rebuild specific service
docker-compose build frontend

# Rebuild and restart
docker-compose up -d --build
```

### Database Operations
```bash
# Run migrations
docker-compose exec backend php artisan migrate

# Seed database
docker-compose exec backend php artisan db:seed

# Reset and migrate
docker-compose exec backend php artisan migrate:fresh --seed

# Access MySQL
docker-compose exec mysql mysql -u root -psecret bank_dashboard
```

### Laravel Artisan Commands
```bash
# Clear cache
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan route:clear

# Optimize
docker-compose exec backend php artisan optimize

# List routes
docker-compose exec backend php artisan route:list
```

### Container Management
```bash
# List running containers
docker-compose ps

# Access backend shell
docker-compose exec backend sh

# Access frontend shell
docker-compose exec frontend sh

# Access MySQL shell
docker-compose exec mysql mysql -u root -psecret
```

---

## 🔧 Configuration Details

### Frontend Dockerfile

The frontend uses a multi-stage build:
1. **Builder stage**: Compiles the React/Vite application
2. **Production stage**: Serves with nginx

Key features:
- Optimized production build
- Gzip compression enabled
- Client-side routing support
- Static asset caching

### Backend Dockerfile

The backend container includes:
- PHP 8.2 FPM
- Required PHP extensions (pdo_mysql, mbstring, etc.)
- Composer for dependency management
- Proper file permissions for Laravel

### Docker Compose

The `docker-compose.yml` orchestrates:
- **MySQL** with persistent data volume
- **Backend** with auto-migration on startup
- **Frontend** (production and dev modes)
- **Nginx** for serving Laravel via PHP-FPM
- **Network** for inter-service communication

---

## 🔑 Environment Variables

### Required Frontend Variables
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000/api)

### Required Backend Variables
- `APP_KEY`: Laravel application key
- `DB_HOST`: Database host (use `mysql` for Docker)
- `DB_DATABASE`: Database name
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password

---

## 📝 Development Workflow

### Development Mode (Recommended)

1. Start development services:
```bash
docker-compose --profile dev up -d frontend-dev backend mysql
```

2. Access:
   - Frontend (with hot reload): http://localhost:5174
   - Backend API: http://localhost:8000

3. Make changes to your code - they'll automatically reload!

### Production Mode

1. Build and start:
```bash
docker-compose up -d --build
```

2. Access:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :5173
lsof -i :8000
lsof -i :3306

# Change ports in docker-compose.yml
# Example: "5173:80" -> "3000:80"
```

### Database Connection Issues
```bash
# Ensure MySQL is healthy
docker-compose ps

# Check MySQL logs
docker-compose logs mysql

# Verify database exists
docker-compose exec mysql mysql -u root -psecret -e "SHOW DATABASES;"
```

### Frontend Can't Connect to Backend
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running: `docker-compose ps`
- Check CORS settings in Laravel `config/cors.php`

### Clear Everything and Start Fresh
```bash
# Stop all containers
docker-compose down -v

# Remove all images
docker-compose rm -f

# Rebuild from scratch
docker-compose up -d --build
```

### Permission Issues (Linux)
```bash
# Fix backend storage permissions
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
docker-compose exec backend chmod -R 775 storage bootstrap/cache
```

---

## 🔒 Production Deployment

### Security Checklist

1. ✅ Set `APP_ENV=production` in backend `.env`
2. ✅ Set `APP_DEBUG=false` in backend `.env`
3. ✅ Use strong passwords for database
4. ✅ Generate a unique `APP_KEY`
5. ✅ Configure proper CORS settings
6. ✅ Use HTTPS in production (add reverse proxy like Caddy or Traefik)
7. ✅ Set up proper firewall rules
8. ✅ Use environment-specific `.env` files

### Optimization

```bash
# Backend optimizations
docker-compose exec backend php artisan config:cache
docker-compose exec backend php artisan route:cache
docker-compose exec backend php artisan view:cache
docker-compose exec backend php artisan optimize
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Laravel Deployment](https://laravel.com/docs/deployment)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

## ⚙️ Advanced Configuration

### Custom Database Port
Edit `docker-compose.yml`:
```yaml
mysql:
  ports:
    - "3307:3306"  # Use port 3307 on host
```

### Add Redis Cache
Add to `docker-compose.yml`:
```yaml
redis:
  image: redis:alpine
  ports:
    - "6379:6379"
  networks:
    - bank-dashboard-network
```

Update backend `.env`:
```env
CACHE_DRIVER=redis
REDIS_HOST=redis
REDIS_PORT=6379
```

---

## 🆘 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Ensure all ports are available
4. Try rebuilding: `docker-compose up -d --build`
