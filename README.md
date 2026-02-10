# Music Metadata ETL (Extract, Transform, Load) Pipeline

## 🎵 Project Overview
This tool is designed to **modernize legacy music catalogs**. 
It automates the cleaning of inconsistent metadata (e.g., Composer names, Work titles) and migrates them into a structured SQL database.

## 🚀 Key Features
1. **Automated Cleaning:** Transforms raw, messy text (e.g., `L. v. Beethoven`) into standardized formats (`Beethoven, Ludwig van`).
2. **Data Integrity:** Identifies and fixes missing fields or duplicates using SQL logic.
3. **Migration Simulation:** Demonstrates how to move data from legacy files to a modern system safely.

## 🛠 Tech Stack
- **Node.js:** Core logic for data processing.
- **SQLite (SQL):** Database management and querying.