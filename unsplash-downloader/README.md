# Unsplash Image Downloader - Complete Setup Guide

This guide will walk you through setting up the Unsplash image downloader as a completely separate Node.js project.

## Prerequisites

- Node.js installed on your computer (version 14 or higher)
- A text editor (VS Code, Sublime Text, etc.)
- Basic familiarity with terminal/command line

## Step 1: Create Unsplash Developer Account

1. **Visit Unsplash Developers**

   - Go to https://unsplash.com/developers
   - Click "Register as a developer"

2. **Create Account**

   - Sign up with email or use existing Unsplash account
   - Accept the API terms

3. **Create New Application**

   - Click "New Application"
   - Fill out the form:
     - **Application name**: "Image Downloader"
     - **Description**: "Tool for downloading category thumbnails"
     - **Accept terms and guidelines**
   - Click "Create Application"

4. **Get Your Access Key**
   - Copy the "Access Key" (starts with something like `abc123...`)
   - Keep this safe - you'll need it later

## Step 2: Install Project Dependencies

1. **Install dependencies**
   ```bash
   npm install
   ```

## Step 3: Create Environment Configuration

1. **Create a `.env` file**

   - In your project root, create a file named `.env`
   - Add the following lines:

     ```plaintext
     UNSPLASH_ACCESS_KEY=your_actual_access_key_here
     IMAGE_WIDTH=285
     IMAGE_HEIGHT=380
     DOWNLOAD_DELAY=2000
     CATEGORIES_FILE=./categories.json
     ```

   - Replace `your_actual_access_key_here` with the access key you copied earlier
   - The `CATEGORIES_FILE` variable specifies which categories file to use (optional)

## Step 4: Run the Script

1. **Download all category thumbnails:**

   ```bash
   npm run start
   ```

2. **Download from a custom categories file:**

   ```bash
   npm run start categories "my-custom-categories.json"
   ```

3. **Download a single image:**
   ```bash
   npm run start single "nature"
   npm run start single "coffee" "my-coffee.webp"
   ```

## Step 5: Check Your Downloads

1. **View downloaded images**
   - Look in the `downloads/` folder
   - All images will be 285 × 380 pixels
   - Category thumbnails will be named like `fan-qa.webp`, `game-night.webp`, etc.

## Project Structure

After setup, your project will look like this:

```
unsplash-downloader/
├── package.json
├── downloader.js
├── categories.json
├── node_modules/
└── downloads/
    ├── fan-qa.webp
    ├── creative-collab.webp
    ├── game-night.webp
    └── ... (all other category images)
```

## Categories Configuration

The downloader now uses a separate JSON file for categories, making it completely data-agnostic:

### Default Categories File (`categories.json`)

The downloader comes with a default `categories.json` file containing predefined categories. Each category has:

```json
{
  "title": "Human-readable name",
  "slug": "url-friendly-name"
}
```

### Custom Categories

You can create your own categories file:

1. **Create a new JSON file** (e.g., `my-categories.json`)
2. **Use the same structure**:
   ```json
   [
     { "title": "Photography", "slug": "photography" },
     { "title": "Web Design", "slug": "web-design" },
     { "title": "Nature", "slug": "nature" }
   ]
   ```
3. **Run with custom file**:
   ```bash
   npm run start categories "my-categories.json"
   ```

### Environment Variable

Set `CATEGORIES_FILE` in your `.env` to change the default categories file:

```
CATEGORIES_FILE=./my-custom-categories.json
```

## Troubleshooting

### Common Issues:

1. **"Unsplash Access Key not found!"**

   - Make sure your `.env` file exists and contains `UNSPLASH_ACCESS_KEY=your_key`
   - Check that there are no extra spaces or quotes around your key

2. **"HTTP error! status: 403"**

   - Your access key might be invalid or you've hit rate limits
   - Wait a few minutes and try again

3. **"No images found"**

   - Some search terms might not return results
   - Try more generic search terms

4. **"dotenv not found"**

   - Run `npm install dotenv` in your project directory

5. **".env file not loading"**
   - Make sure `.env` is in the same directory as `downloader.js`
   - Check file permissions and that the file isn't hidden

### Rate Limits:

- Unsplash allows 50 requests per hour for development
- The script adds 2-second delays between requests
- If you hit limits, wait an hour and try again

## Next Steps

- **Customize categories**: Edit `categories.json` or create your own categories file
- **Change image dimensions**: Modify `IMAGE_WIDTH` and `IMAGE_HEIGHT` in `.env`
- **Adjust delay**: Change `DOWNLOAD_DELAY` in `.env` (milliseconds)
- **Add more categories**: Add new objects to your categories JSON file
- **Use different category sets**: Create multiple JSON files for different projects
- **Batch processing**: Use the single image download feature for custom searches

## Tips

- **Keep your `.env` file secure** (never commit it to version control)
- **Use `.env.example`** to share configuration template with others
- **Test with a single category** first before downloading all
- **Check image quality** and adjust search terms if needed
- **Environment variables** make it easy to change settings without editing code

## Environment Variables Reference

| Variable              | Default           | Description                             |
| --------------------- | ----------------- | --------------------------------------- |
| `UNSPLASH_ACCESS_KEY` | Required          | Your Unsplash API access key            |
| `IMAGE_WIDTH`         | 285               | Width of downloaded images in pixels    |
| `IMAGE_HEIGHT`        | 380               | Height of downloaded images in pixels   |
| `DOWNLOAD_DELAY`      | 2000              | Delay between downloads in milliseconds |
| `CATEGORIES_FILE`     | ./categories.json | Path to the categories JSON file        |
