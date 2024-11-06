# GitOpsNow - Enterprise DevOps Solutions

Modern landing page for GitOpsNow, showcasing enterprise DevOps and GitOps solutions.

![GitOpsNow](https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200)

## 🚀 Quick Start

### Development

1. Clone the repository:
```bash
git clone https://github.com/oxie/gitopsNow.git
cd gitopsNow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Build the project for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🐳 Docker

### Build and Run Locally

1. Build the Docker image:
```bash
docker build -t gitopsnow:latest .
```

2. Run the container:
```bash
docker run -d -p 80:80 gitopsnow:latest
```

3. Access the website at [http://localhost](http://localhost)

### Pull from Docker Hub

```bash
docker pull oxgroth/gitopsnow:latest
docker run -d -p 80:80 oxgroth/gitopsnow:latest
```

## 🌐 Deployment Options

### 1. Traditional Web Server

1. Build the project:
```bash
npm run build
```

2. Copy the contents of the `dist` folder to your web server's root directory.

3. Configure your web server (Apache/Nginx) to handle SPA routing:

For Nginx:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 2. Cloud Platforms

#### AWS S3 + CloudFront

1. Create an S3 bucket
2. Enable static website hosting
3. Upload the `dist` contents
4. Create a CloudFront distribution
5. Configure CloudFront to handle SPA routing

#### Netlify

1. Connect your repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons

## 📦 Project Structure

```
gitopsnow/
├── src/
│   ├── components/     # React components
│   ├── lib/           # Utilities and helpers
│   ├── contexts/      # React contexts
│   └── assets/        # Static assets
├── public/            # Public assets
└── dist/             # Production build
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=GitOpsNow
VITE_APP_DESCRIPTION=Enterprise DevOps Solutions
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom colors
      }
    }
  }
}
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request