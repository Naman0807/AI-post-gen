# Social Media Post Generator

## Overview

A powerful AI-driven social media post generator that creates engaging content and matching images for multiple platforms including LinkedIn, Twitter, and Instagram.

## Features

- AI-powered content generation using Gemini API
- Image generation using Hugging Face API
- Multi-platform support (LinkedIn, Twitter, Instagram)
- Engagement score analysis
- Customizable post length and creativity settings
- Real-time content preview
- One-click copy and download functionality
- User authentication and post history

## Tech Stack

- Frontend: Next.js, Material-UI, TailwindCSS
- Backend: Python (Flask)
- APIs: Google Gemini, Hugging Face
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v15 or higher)
- Python 3.8+
- MongoDB
- Google Gemini API key
- Hugging Face API key

## Installation

### Frontend Setup

1. Clone the repository

```bash
git clone https://github.com/Naman0807/AI-post-gen.git
cd AI-post-gen
npm install
```

2. Start the development server

```bash
npm run dev
```

### Backend Setup

1. Install Python dependencies

```bash
pip install -r requirements.txt
```

2. Set up environment variables

```bash
cp .env
```

GEMINI_API_KEY=your_gemini_api_key

HUGGINGFACE_API_KEY=your_huggingface_api_key

MONGODB_URI=your_mongodb_uri

JWT_SECRET_KEY=your_jwt_secret

3. Start the Flask server

```bash
python app.py
```

## Usage

1. Register/Login to access the dashboard
2. Configure your API keys in the dashboard
3. Select your target platform (LinkedIn, Twitter, or Instagram)
4. Enter your topic and customize generation settings
5. Click "Generate Post" to create content
6. View the engagement score and preview the generated content
7. Copy the content or download generated images
8. Save posts to your history

## API Endpoints

- POST /api/auth/register - User registration
- POST /api/auth/login - User authentication
- POST /api/generate_post - Generate content and images
- GET /api/posts - Retrieve user's post history
- POST /api/initialize - Initialize API configurations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For support, email parmarnaman19@gmail.com or open an issue in the repository.

## Acknowledgments

- Google Gemini API for content generation
- Hugging Face for image generation
- Material-UI for the component library
- Next.js team for the amazing framework
