import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const newsId = params.id
    const filePath = path.join(process.cwd(), 'public', 'dropbox-downloads', `news${newsId}.html`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 })
    }
    
    const htmlContent = fs.readFileSync(filePath, 'utf-8')
    
    // Extract just the body content and style it for the modal
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
    
    let bodyContent = bodyMatch ? bodyMatch[1] : htmlContent
    let styles = styleMatch ? styleMatch[1] : ''
    
    // Clean up the content and make it modal-friendly
    const cleanContent = `
      <div style="
        background: #000000;
        color: #00ff41;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 20px;
        line-height: 1.6;
        max-width: 100%;
        overflow-x: auto;
      ">
        <style>
          ${styles}
          body { margin: 0; padding: 0; }
          * { box-sizing: border-box; }
        </style>
        ${bodyContent}
      </div>
    `
    
    return new NextResponse(cleanContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Error reading news file:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
