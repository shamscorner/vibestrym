// Load environment variables
require('dotenv').config();

const fs = require('fs');
const path = require('path');

// Configuration from environment variables
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const IMAGE_WIDTH = parseInt(process.env.IMAGE_WIDTH) || 285;
const IMAGE_HEIGHT = parseInt(process.env.IMAGE_HEIGHT) || 380;
const DOWNLOAD_DELAY = parseInt(process.env.DOWNLOAD_DELAY) || 2000;
const DEFAULT_FILE_LOCATION = process.env.FILE_LOCATION || './categories.json';
const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER || 'downloads';

/**
 * Load categories from a JSON file
 */
function loadCategories(filePath = DEFAULT_FILE_LOCATION) {
    try {
        const fullPath = path.resolve(filePath);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`Categories file not found: ${fullPath}`);
        }

        const data = fs.readFileSync(fullPath, 'utf8');
        const categories = JSON.parse(data);

        // Validate categories structure
        if (!Array.isArray(categories)) {
            throw new Error('Categories file must contain an array');
        }

        categories.forEach((category, index) => {
            if (!category.title || !category.slug) {
                throw new Error(`Invalid category at index ${index}: must have 'title' and 'slug' properties`);
            }
        });

        return categories;
    } catch (error) {
        console.error(`❌ Error loading categories from ${filePath}:`, error.message);
        process.exit(1);
    }
}

/**
 * Download an image from a URL to local file
 */
async function downloadImage(url, filename) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create output directory if it doesn't exist
        const outputDir = path.join(__dirname, OUTPUT_FOLDER);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, buffer);

        console.log(`✅ Downloaded: ${filename}`);
        return filePath;
    } catch (error) {
        console.error(`❌ Error downloading ${filename}:`, error.message);
        return null;
    }
}

/**
 * Search for a single image on Unsplash
 */
async function searchImage(query) {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait`;

    const response = await fetch(searchUrl, {
        headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results[0] || null;
}

/**
 * Download thumbnails for all categories
 */
async function downloadAllCategoryThumbnails(categories, categoriesFile = DEFAULT_FILE_LOCATION) {
    if (!UNSPLASH_ACCESS_KEY) {
        console.error('❌ Unsplash Access Key not found!');
        console.log('📝 Please check your .env file and make sure UNSPLASH_ACCESS_KEY is set');
        console.log('💡 Example: UNSPLASH_ACCESS_KEY=abc123xyz...');
        return;
    }

    console.log(`📂 Using categories from: ${categoriesFile}`);
    console.log(`🚀 Starting download of ${categories.length} category thumbnails...`);
    console.log(`📏 Target size: ${IMAGE_WIDTH} × ${IMAGE_HEIGHT}`);
    console.log(`📁 Images will be saved to: ./${OUTPUT_FOLDER}/\n`);

    const results = {
        successful: [],
        failed: []
    };

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        console.log(`[${i + 1}/${categories.length}] Processing: ${category.title}`);

        try {
            // Convert slug to search terms
            const searchQuery = category.slug.replace(/-/g, ' ');
            console.log(`🔍 Searching for: "${searchQuery}"`);

            const photo = await searchImage(searchQuery);

            if (!photo) {
                console.log(`⚠️  No images found for "${searchQuery}"`);
                results.failed.push(category.title);
                continue;
            }

            // Construct URL with specific dimensions
            const imageUrl = `${photo.urls.raw}&w=${IMAGE_WIDTH}&h=${IMAGE_HEIGHT}&fit=crop&crop=faces`;

            // Create filename
            const filename = `${category.slug}.webp`;

            console.log(`📷 Found: ${photo.alt_description || 'Image'}`);

            const filePath = await downloadImage(imageUrl, filename);

            if (filePath) {
                results.successful.push(category.title);
            } else {
                results.failed.push(category.title);
            }

            // Add delay between downloads
            if (i < categories.length - 1) {
                console.log(`⏳ Waiting ${DOWNLOAD_DELAY / 1000} seconds...\n`);
                await new Promise(resolve => setTimeout(resolve, DOWNLOAD_DELAY));
            }

        } catch (error) {
            console.error(`❌ Error processing ${category.title}:`, error.message);
            results.failed.push(category.title);
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 DOWNLOAD SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${results.successful.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);

    if (results.successful.length > 0) {
        console.log('\n✅ Successfully downloaded:');
        results.successful.forEach(title => console.log(`  - ${title}`));
    }

    if (results.failed.length > 0) {
        console.log('\n❌ Failed to download:');
        results.failed.forEach(title => console.log(`  - ${title}`));
    }

    console.log(`\n📁 Check the ./${OUTPUT_FOLDER}/ folder for your images!`);
}

/**
 * Download a single image by search term
 */
async function downloadSingleImage(searchTerm, filename) {
    if (!UNSPLASH_ACCESS_KEY) {
        console.error('❌ Unsplash Access Key not found!');
        console.log('📝 Please check your .env file and make sure UNSPLASH_ACCESS_KEY is set');
        return;
    }

    console.log(`🔍 Searching for: "${searchTerm}"`);

    try {
        const photo = await searchImage(searchTerm);

        if (!photo) {
            console.log(`⚠️  No images found for "${searchTerm}"`);
            return;
        }

        const imageUrl = `${photo.urls.raw}&w=${IMAGE_WIDTH}&h=${IMAGE_HEIGHT}&fit=crop&crop=faces`;
        const finalFilename = filename || `${searchTerm.replace(/\s+/g, '_')}.webp`;

        console.log(`📷 Found: ${photo.alt_description || 'Image'}`);
        await downloadImage(imageUrl, finalFilename);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
    // No arguments - download all categories
    const categories = loadCategories();
    downloadAllCategoryThumbnails(categories);
} else if (args[0] === 'categories') {
    // Download categories from custom file
    if (args.length < 2) {
        console.log('Usage: node downloader.js categories "path/to/categories.json"');
        process.exit(1);
    }
    const categoriesFile = args[1];
    const categories = loadCategories(categoriesFile);
    downloadAllCategoryThumbnails(categories, categoriesFile);
} else if (args[0] === 'single') {
    // Single image download
    if (args.length < 2) {
        console.log('Usage: node downloader.js single "search term" [filename]');
        process.exit(1);
    }
    const searchTerm = args[1];
    const filename = args[2];
    downloadSingleImage(searchTerm, filename);
} else {
    console.log('Usage:');
    console.log('  node downloader.js                           # Download all category thumbnails');
    console.log('  node downloader.js categories "custom.json"  # Download from custom categories file');
    console.log('  node downloader.js single "nature"           # Download single image');
    console.log('  node downloader.js single "coffee" "my-coffee.webp"  # Download with custom filename');
}
