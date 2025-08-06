#!/bin/bash

# Deploy demo to GitHub Pages
echo "🚀 Building and deploying demo to GitHub Pages..."

# Build the demo
cd demo
npm run build
cd ..

# Deploy to gh-pages branch
npx gh-pages -d demo/dist

echo "✅ Demo deployed successfully!"
echo "🌐 Live demo: https://andoikm.github.io/tiptap-title-editor/"
