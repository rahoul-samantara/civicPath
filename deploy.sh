#!/bin/bash
# CivicPath AI Deployment Guide

echo "🚀 Preparing for deployment..."

# 1. Build the production bundle
npm run build

# 2. Deploy to Firebase Hosting (Recommended for Hackathon)
# Prerequisite: firebase-tools installed and firebase init completed.
# firebase deploy --only hosting

# 3. Deploy Backend (If using Cloud Run for Gemini Orchestration)
# gcloud run deploy civicpath-api --source . --platform managed

echo "✅ Deployment commands ready. See docs/architecture.md for environment variables required."
