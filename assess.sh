#!/bin/bash
# First npm install in root directory
echo "Installing dependencies in root directory..."
npm install

# Start the npm server in background
echo "Starting npm server..."

lsof -ti :3000 | xargs -r kill -9 # kill any existing server on port 3000
BROWSER=none PORT=3000 npm -- start &

# Store the server process ID
SERVER_PID=$!

# Wait a moment for server to start
sleep 5

# Change directory to assessment
echo "Changing to assessment directory..."
cd assessment

# Install dependencies in assessment directory
echo "Installing dependencies in assessment directory..."
npm install

# Run Cypress tests
echo "Running Cypress tests..."
npx cypress run
