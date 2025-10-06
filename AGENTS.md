# DNA Solar System - Agent Guide

## Project Overview
A static single-page 3D DNA visualization using Three.js. Users upload DNA .txt files to generate personalized solar systems with 7 planetary objects representing genomic categories (Origins, Mind, Body, Nutrition, Sleep, Senses, Resilience).

## Commands
- **Dev Server**: Open index.html in a browser (no build step required)
- **Deploy**: Push to main branch (GitHub Pages via CNAME: dnasolar.art)

## Architecture
- **Type**: Static HTML/CSS/JavaScript site
- **3D Engine**: Three.js (CDN r128)
- **PDF Export**: jsPDF (CDN v2.5.1)
- **Audio**: Background music from cdn.pixabay.com
- **DNA Processing**: Client-side filtering against 200+ rsid SNPs, optional Claude API analysis

## Code Style
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **DOM**: Use document.getElementById() for element selection
- **Three.js**: Group-based object hierarchies, standardMaterial with roughness/metalness
- **Colors**: Vibrant hex palette (0xff6b9d, 0x8e44ad, 0x3498db, etc.)
- **Animations**: requestAnimationFrame loop, smooth lerp transitions (0.05-0.1)
- **Events**: addEventListener for all interactions, prevent default on touch events
