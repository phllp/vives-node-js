# Step-by-Step Deployment Guide on GCP

## 1. Create a Virtual Machine (VM) on GCP

- Go to Google Cloud Console.
- Navigate to **Compute Engine > VM instances**.
- Click **"Create Instance"**.
- Choose a Debian-based OS image (e.g., **Debian 11**).
- Set the machine type (e.g., `e2-micro` or higher).
- Allow **HTTP** and **HTTPS** traffic in the firewall settings.
- Note the **external IP address** assigned to the VM.

## 2. Connect to the VM via SSH

You can use The SSH button in the GCP console.

## 3. Install Required Software

### Update system packages

```bash
sudo apt update && sudo apt upgrade -y
```

### Necessary software

- Git
- Docker
  - Follow the docker engine install and post install instructions available at the oficial Docker documentation page.
- NodeJs (22.x) and npm
- pnpm
- pm2
  ```bash
  # install pm2 globally
  pnpm add -g pm2
  ```

## 4. Clone The Repository

```bash
cd ~
git clone https://github.com/phllp/vives-node-js
cd vives-node-js
```

## 5. Setup environment vars

It's necessary to create a `.env` file with the same vars declared in the `.env.example` file. Consult the admin to see the proper values for each variable.

## 6. Set Up and Run MongoDB with Docker

```bash
docker compose up -d
```

## 6. Start the API with PM2

```bash
pnpm install
pnpm build
pm2 start dist/main.js --name donation-api
```

## 7. Install and Configure Nginx

```bash
sudo apt install nginx -y
```

Create a new site configuration:

```bash
sudo nano /etc/nginx/sites-available/api
```

Paste a reverse proxy configuration pointing to port 3000, then:

```bash
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 8. Obtain an SSL Certificate with Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d www.example-domain.com
```

## 9. Configure DNS

- Go to your domain registrar’s DNS settings.
- Create an **A record** pointing `www.example-domain.com` to your VM’s external IP.
