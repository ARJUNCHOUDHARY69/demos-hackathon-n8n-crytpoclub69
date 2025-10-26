#!/usr/bin/env node

/**
 * Test Dropbox Service - Actually download files
 */

const https = require('https')
const fs = require('fs').promises
const path = require('path')

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

// Configuration
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN
const DOWNLOAD_DIR = './public/dropbox-downloads'
const MAIN_FOLDER_PATH = '/main'

// Utility function to make HTTP requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          resolve(result)
        } catch (error) {
          resolve(data)
        }
      })
    })
    
    req.on('error', reject)
    
    if (postData) {
      req.write(JSON.stringify(postData))
    }
    
    req.end()
  })
}

// Ensure download directory exists
async function ensureDownloadDirectory() {
  try {
    await fs.access(DOWNLOAD_DIR)
    console.log('📁 Download directory exists:', DOWNLOAD_DIR)
  } catch {
    await fs.mkdir(DOWNLOAD_DIR, { recursive: true })
    console.log('📁 Created download directory:', DOWNLOAD_DIR)
  }
}

// List files in Dropbox main/ folder
async function listDropboxFiles() {
  try {
    console.log('🔍 Listing files from Dropbox main/ folder...')
    
    const options = {
      hostname: 'api.dropboxapi.com',
      port: 443,
      path: '/2/files/list_folder',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
    
    const postData = {
      path: MAIN_FOLDER_PATH,
      recursive: false,
      include_media_info: false,
      include_deleted: false,
      include_has_explicit_shared_members: false,
      include_mounted_folders: true,
      include_non_downloadable_files: false
    }
    
    const result = await makeRequest(options, postData)
    const files = result.entries.filter(file => file['.tag'] === 'file')
    
    console.log(`📋 Found ${files.length} files in main/ folder`)
    return files
  } catch (error) {
    console.error('❌ Error listing Dropbox files:', error)
    throw error
  }
}

// Download a single file from Dropbox
async function downloadDropboxFile(file) {
  try {
    console.log(`⬇️ Downloading: ${file.name} (${file.size} bytes)`)
    
    const options = {
      hostname: 'content.dropboxapi.com',
      port: 443,
      path: '/2/files/download',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: file.path_display
        })
      }
    }
    
    const fileBuffer = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        const chunks = []
        res.on('data', chunk => chunks.push(chunk))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      })
      req.on('error', reject)
      req.end()
    })
    
    const localPath = path.join(DOWNLOAD_DIR, file.name)
    await fs.writeFile(localPath, fileBuffer)
    
    console.log(`✅ Downloaded: ${file.name} (${fileBuffer.length} bytes)`)
    return { success: true, localPath, size: fileBuffer.length }
  } catch (error) {
    console.error(`❌ Failed: ${file.name} - ${error.message}`)
    return { success: false, error: error.message }
  }
}

// Download all files from main/ folder
async function downloadAllFiles() {
  try {
    console.log('🚀 Starting Dropbox download test...')
    
    // Check if API token is provided
    if (!DROPBOX_ACCESS_TOKEN) {
      console.error('❌ Error: DROPBOX_ACCESS_TOKEN environment variable is not set!')
      console.error('Please set the DROPBOX_ACCESS_TOKEN environment variable.')
      process.exit(1)
    }
    
    await ensureDownloadDirectory()
    const files = await listDropboxFiles()
    
    if (files.length === 0) {
      console.log('📭 No files found in main/ folder')
      return { success: true, downloaded: 0, failed: 0, files: [] }
    }
    
    console.log(`📦 Found ${files.length} files to download`)
    
    const results = []
    let downloaded = 0
    let failed = 0
    
    // Download first 5 files as test
    const testFiles = files.slice(0, 5)
    console.log(`🧪 Testing with first ${testFiles.length} files...`)
    
    for (const file of testFiles) {
      const result = await downloadDropboxFile(file)
      results.push({
        name: file.name,
        success: result.success,
        localPath: result.localPath,
        size: result.size,
        error: result.error
      })
      
      if (result.success) {
        downloaded++
      } else {
        failed++
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    console.log(`🎉 Test download complete: ${downloaded} successful, ${failed} failed`)
    
    return {
      success: true,
      downloaded,
      failed,
      files: results
    }
  } catch (error) {
    console.error('❌ Error in downloadAllFiles:', error)
    return {
      success: false,
      downloaded: 0,
      failed: 0,
      files: []
    }
  }
}

// Run the test
downloadAllFiles().then(result => {
  console.log('\n📊 Final Results:')
  console.log(`✅ Success: ${result.success}`)
  console.log(`📥 Downloaded: ${result.downloaded}`)
  console.log(`❌ Failed: ${result.failed}`)
  
  if (result.files.length > 0) {
    console.log('\n📁 Downloaded Files:')
    result.files.forEach(file => {
      if (file.success) {
        console.log(`  ✅ ${file.name} (${file.size} bytes)`)
      } else {
        console.log(`  ❌ ${file.name} - ${file.error}`)
      }
    })
  }
  
  process.exit(0)
}).catch(error => {
  console.error('❌ Test failed:', error)
  process.exit(1)
})
