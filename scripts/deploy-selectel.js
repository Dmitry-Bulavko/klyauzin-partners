const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config({ path: '.env.production' });

// Configuration
const CONTAINER_NAME = process.env.SELECTEL_CONTAINER;
const SELECTEL_ENDPOINT = process.env.SELECTEL_ENDPOINT;

if (!CONTAINER_NAME || !SELECTEL_ENDPOINT) {
  console.error('❌ Missing required environment variables. Please check .env.production file');
  process.exit(1);
}

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

// Function to get MIME type
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// Function to upload file to Selectel
function uploadFile(filePath, containerPath) {
  const mimeType = getMimeType(filePath);
  const command = `curl -X PUT "${SELECTEL_ENDPOINT}/${CONTAINER_NAME}/${containerPath}" \
    -H "Content-Type: ${mimeType}" \
    --data-binary "@${filePath}"`;
  
  try {
    execSync(command);
    console.log(`✓ Uploaded: ${containerPath}`);
  } catch (error) {
    console.error(`✗ Failed to upload ${containerPath}:`, error.message);
  }
}

// Function to recursively process directory
function processDirectory(dirPath, basePath = '') {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    const relativePath = path.join(basePath, file);

    if (stat.isDirectory()) {
      processDirectory(fullPath, relativePath);
    } else {
      uploadFile(fullPath, relativePath);
    }
  });
}

// Main deployment function
async function deploy() {
  console.log('🚀 Starting production deployment to Selectel...');
  
  // Verify build directory exists
  if (!fs.existsSync('dist-selectel')) {
    console.error('❌ Build directory not found. Please run build:prod first.');
    process.exit(1);
  }

  // Upload all files from dist-selectel directory
  processDirectory('dist-selectel');
  
  console.log('✅ Production deployment completed!');
}

// Run deployment
deploy().catch(error => {
  console.error('❌ Deployment failed:', error);
  process.exit(1);
}); 