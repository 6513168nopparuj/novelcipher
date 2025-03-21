
# NovelCipher - Secure Novel Reading Application

A secure web application for reading novels with encryption and copy protection features.

## Project Overview

NovelCipher provides a secure reading experience with:
- End-to-end encryption of novel content
- Copy protection to prevent unauthorized content extraction
- Clean, responsive reading interface
- Chapter navigation and font size adjustment

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- MongoDB (v4.4 or later)
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=3000
MONGODB_URI=mongodb://localhost:27017/novels

# Encryption Settings
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef
ENCRYPTION_IV=abcdef9876543210
```

### Backend Setup

1. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```

2. Make sure MongoDB is running on your system:
   ```sh
   # Start MongoDB (command may vary depending on your OS and installation method)
   mongod --dbpath /path/to/data/db
   ```

3. Start the server:
   ```sh
   npm run dev
   ```

4. The API server will be available at `http://localhost:3000`

### Frontend Setup

1. Install frontend dependencies:
   ```sh
   # From the project root
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

3. The application will be available at `http://localhost:8080`

## Database Structure

NovelCipher uses MongoDB with the following structure:
- Database: `novels`
- Collection: `chapters`
- Document format: `{ "chapter": number, "content": "encrypted-content" }`

## API Endpoints

- GET `/api/chapters` - Returns a list of all available chapters
- GET `/api/chapters/:id` - Returns the decrypted content of a specific chapter

## Client Features

- **Home Page**: Browse and select available chapters
- **Reader Page**: Read chapter content with navigation controls
- **Security Features**: Copy protection, encrypted content transmission
- **Customization**: Adjustable font size, settings persistence

## Deployment

For production deployment:

```sh
# Build frontend
npm run build

# Start production server
cd server
npm start
```

## Custom Domain Setup

We don't support custom domains yet. If you want to deploy your project under your own domain, we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Development

This project was created with [Lovable](https://lovable.dev/projects/cae12dac-c3e8-46d2-b625-30575afc526d).

### Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Security**: AES-256-CBC encryption, copy protection measures

## Contributing

1. Clone the repository
2. Create a new branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add some awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request
