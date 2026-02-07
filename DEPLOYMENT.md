# AgriNova Frontend Deployment Guide

## Prerequisites
- A VPS with Ubuntu 20.04+ or similar Linux distribution
- Root or sudo access
- Domain name (optional but recommended)
- GitHub repository with your code

## Step 1: VPS Initial Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js (v20+)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verify installation (should be >= 20.9.0)
```

### 1.3 Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl status nginx
```

### 1.4 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 --version  # Verify installation
```

### 1.5 Install Git
```bash
sudo apt install git -y
```

### 1.6 Configure Firewall
```bash
sudo ufw allow 22      # SSH
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw enable
sudo ufw status
```

## Step 2: Clone and Setup Application

### 2.1 Create Project Directory
```bash
sudo mkdir -p /var/www
cd /var/www
```

### 2.2 Clone Repository
```bash
# If public repository:
sudo git clone https://github.com/YOUR_USERNAME/agrinova-frontend.git

# If private repository (use HTTPS with token or SSH):
sudo git clone https://YOUR_TOKEN@github.com/YOUR_USERNAME/agrinova-frontend.git
```

### 2.3 Set Permissions
```bash
sudo chown -R $USER:$USER /var/www/agrinova-frontend
cd /var/www/agrinova-frontend
```

### 2.4 Install Dependencies
```bash
npm install
```

### 2.5 Build Application
```bash
npm run build
```

## Step 3: Configure PM2

### 3.1 Start Application
```bash
pm2 start npm --name "agrinova-frontend" -- start -- -p 8866
```

### 3.2 Save PM2 Configuration
```bash
pm2 save
pm2 startup
# Copy and run the command shown in the output
```

### 3.3 Verify Application is Running
```bash
pm2 status
pm2 logs agrinova-frontend
curl http://localhost:8866  # Test locally
```

## Step 4: Configure Nginx

### 4.1 Copy Nginx Configuration
```bash
sudo cp /var/www/agrinova-frontend/nginx.conf /etc/nginx/sites-available/agrinova
```

### 4.2 Edit Configuration
```bash
sudo nano /etc/nginx/sites-available/agrinova
```

**Update the following:**
- Replace `your-domain.com` with your actual domain
- Or replace `server_name` with your VPS IP address

### 4.3 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/agrinova /etc/nginx/sites-enabled/
```

### 4.4 Test Nginx Configuration
```bash
sudo nginx -t
```

### 4.5 Restart Nginx
```bash
sudo systemctl restart nginx
sudo systemctl status nginx
```

## Step 5: Test Deployment

Visit your domain or VPS IP in a browser:
- `http://your-domain.com` or
- `http://your_vps_ip`

You should see your AgriNova application running!

## Step 6: Set Up SSL (Optional but Recommended)

### 6.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Obtain SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 6.3 Test Auto-Renewal
```bash
sudo certbot renew --dry-run
```

After SSL is set up, uncomment the HTTPS section in your nginx.conf file and restart nginx.

## Future Deployments

### Quick Update Method
```bash
cd /var/www/agrinova-frontend
git pull origin main
npm install
npm run build
pm2 restart agrinova-frontend
```

### Or Use the Deployment Script
```bash
cd /var/www/agrinova-frontend
chmod +x deploy.sh
./deploy.sh
```

## Useful PM2 Commands

```bash
pm2 status                    # Check application status
pm2 logs agrinova-frontend    # View logs
pm2 restart agrinova-frontend # Restart application
pm2 stop agrinova-frontend    # Stop application
pm2 delete agrinova-frontend  # Remove from PM2
pm2 monit                     # Monitor resources
```

## Useful Nginx Commands

```bash
sudo systemctl status nginx   # Check nginx status
sudo systemctl restart nginx  # Restart nginx
sudo nginx -t                 # Test configuration
sudo tail -f /var/log/nginx/agrinova-access.log  # View access logs
sudo tail -f /var/log/nginx/agrinova-error.log   # View error logs
```

## Troubleshooting

### Application not starting
```bash
pm2 logs agrinova-frontend    # Check PM2 logs
pm2 delete agrinova-frontend
pm2 start npm --name "agrinova-frontend" -- start -- -p 8866
```

### Nginx errors
```bash
sudo nginx -t                 # Test configuration
sudo tail -f /var/log/nginx/error.log
```

### Port already in use
```bash
sudo lsof -i :8866            # Check what's using the port
sudo kill -9 PID              # Kill the process
```

### Check if application is responding
```bash
curl http://localhost:8866
curl http://your-domain.com
```

## Environment Variables

If you need environment variables, create a `.env.local` file:

```bash
cd /var/www/agrinova-frontend
nano .env.local
```

Add your variables:
```
NEXT_PUBLIC_API_URL=https://api.example.com
# Add other variables as needed
```

Then rebuild:
```bash
npm run build
pm2 restart agrinova-frontend
```

## Security Recommendations

1. **Keep system updated**: `sudo apt update && sudo apt upgrade -y`
2. **Use strong passwords** for VPS access
3. **Enable firewall**: Only allow necessary ports
4. **Use SSH keys** instead of passwords for GitHub
5. **Set up SSL certificate** for HTTPS
6. **Regular backups** of your application and data
7. **Monitor logs** regularly for suspicious activity

## Support

For issues or questions, check:
- PM2 logs: `pm2 logs agrinova-frontend`
- Nginx logs: `/var/log/nginx/`
- System logs: `sudo journalctl -xe`
