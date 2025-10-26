// Test script for new Dropbox token
require('dotenv').config({ path: '.env.local' })

console.log('🔑 Testing New Dropbox Token')
console.log('============================')

const token = process.env.DROPBOX_ACCESS_TOKEN

if (!token) {
  console.log('❌ No DROPBOX_ACCESS_TOKEN found!')
  console.log('Please add it to your .env.local file')
  process.exit(1)
}

console.log('✅ Token found!')
console.log('📋 Token length:', token.length)
console.log('🔑 Token starts with:', token.substring(0, 15) + '...')

// Test the token with a simple API call
const https = require('https')

const options = {
  hostname: 'api.dropboxapi.com',
  port: 443,
  path: '/2/users/get_current_account',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

console.log('🧪 Testing token with Dropbox API...')

const req = https.request(options, (res) => {
  let data = ''
  res.on('data', (chunk) => data += chunk)
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Token is VALID!')
      console.log('🎉 You can now use this token')
    } else {
      console.log('❌ Token is INVALID!')
      console.log('📋 Response:', data)
      console.log('🔄 Please generate a new token')
    }
  })
})

req.on('error', (error) => {
  console.log('❌ Network error:', error.message)
})

req.end()
