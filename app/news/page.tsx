'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<number | null>(null)
  const [newsContent, setNewsContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const openNewsModal = async (newsNumber: number) => {
    setSelectedNews(newsNumber)
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/news/${newsNumber}`)
      if (response.ok) {
        const content = await response.text()
        setNewsContent(content)
      } else {
        setNewsContent(`
          <div style="
            background: #000000;
            color: #ff4444;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            text-align: center;
            line-height: 1.6;
          ">
            <h2>Error Loading News Article</h2>
            <p>Sorry, we couldn't load this news article. Please try again later.</p>
          </div>
        `)
      }
    } catch (error) {
      setNewsContent(`
        <div style="
          background: #000000;
          color: #ff4444;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          text-align: center;
          line-height: 1.6;
        ">
          <h2>Error Loading News Article</h2>
          <p>Sorry, we couldn't load this news article. Please try again later.</p>
        </div>
      `)
    } finally {
      setIsLoading(false)
    }
  }

  const closeNewsModal = () => {
    setSelectedNews(null)
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Crypto News
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest cryptocurrency news, market insights, and blockchain developments
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold">
                📈 Market Updates
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold">
                🔗 Blockchain Tech
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold">
                💰 DeFi News
              </div>
                      </div>
                      </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* News Categories */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-400 text-lg">Select a category to filter news</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Category 1 - Bitcoin */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-orange-500 hover:to-red-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-orange-500">₿</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Bitcoin</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Latest BTC news</p>
                    </div>
                  </div>

              {/* Category 2 - Ethereum */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-blue-500">Ξ</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Ethereum</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">ETH ecosystem</p>
                </div>
              </div>

              {/* Category 3 - DeFi */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-green-400 hover:shadow-xl hover:shadow-green-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-green-500">D</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">DeFi</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Decentralized finance</p>
                </div>
              </div>

              {/* Category 4 - NFT */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-purple-500">N</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">NFT</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Digital collectibles</p>
                </div>
              </div>

              {/* Category 5 - Web3 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-cyan-500">W</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Web3</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Next-gen internet</p>
                </div>
              </div>

              {/* Category 6 - Blockchain */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-red-500 hover:to-orange-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-red-500">B</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Blockchain</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Core technology</p>
                </div>
              </div>

              {/* Category 7 - Trading */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-yellow-500">T</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Trading</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Market analysis</p>
                </div>
              </div>

              {/* Category 8 - Regulation */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-indigo-500">R</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Regulation</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Legal updates</p>
                </div>
              </div>

              {/* Category 9 - Security */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-pink-500 hover:to-rose-500 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/20 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all duration-300">
                    <span className="text-white font-bold text-2xl group-hover:text-pink-500">S</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Security</h4>
                  <p className="text-gray-400 text-sm group-hover:text-white/90">Cybersecurity</p>
                </div>
              </div>
            </div>
          </div>

          {/* News Articles Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Latest News Articles
              </h2>
              <p className="text-gray-400 text-lg">Stay informed with the latest crypto developments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* News 1 */}
              <div 
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => openNewsModal(1)}
              >
                {/* Image Gallery */}
                <div className="relative h-48 overflow-hidden">
                  <div className="flex h-full">
                    <img src="/dropbox-downloads/photo1.jpg" alt="News 1" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo2.jpg" alt="News 1" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo3.jpg" alt="News 1" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo4.jpg" alt="News 1" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo5.jpg" alt="News 1" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Bitcoin
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">
                        Bitcoin Market Analysis
                      </h3>
                      <p className="text-gray-400 text-sm">Latest BTC updates and trends</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    Comprehensive analysis of Bitcoin's recent market movements, institutional adoption, and future outlook in the cryptocurrency space.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span>📅</span>
                      <span>Jan 15, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">
                      <span>Read More</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News 2 */}
              <div 
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => openNewsModal(2)}
              >
                {/* Image Gallery */}
                <div className="relative h-48 overflow-hidden">
                  <div className="flex h-full">
                    <img src="/dropbox-downloads/photo6.jpg" alt="News 2" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo7.jpg" alt="News 2" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo8.jpg" alt="News 2" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo9.jpg" alt="News 2" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo10.jpg" alt="News 2" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Ethereum
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                        Ethereum Ecosystem Update
                      </h3>
                      <p className="text-gray-400 text-sm">ETH market insights and developments</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    Latest developments in the Ethereum ecosystem including DeFi protocols, NFT market trends, and upcoming network upgrades.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span>📅</span>
                      <span>Jan 14, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                      <span>Read More</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News 3 */}
              <div 
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => openNewsModal(3)}
              >
                {/* Image Gallery */}
                <div className="relative h-48 overflow-hidden">
                  <div className="flex h-full">
                    <img src="/dropbox-downloads/photo11.jpg" alt="News 3" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo12.jpg" alt="News 3" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo13.jpg" alt="News 3" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo14.jpg" alt="News 3" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <img src="/dropbox-downloads/photo15.jpg" alt="News 3" className="w-1/5 h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      DeFi
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-green-400 transition-colors">
                        DeFi Protocol Innovations
                      </h3>
                      <p className="text-gray-400 text-sm">Latest DeFi updates and yield farming</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    Explore the newest DeFi protocols, yield farming opportunities, and decentralized finance innovations reshaping the crypto landscape.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span>📅</span>
                      <span>Jan 13, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 font-semibold group-hover:text-green-300 transition-colors">
                      <span>Read More</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News 4 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-purple-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(4)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">4</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 4</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">NFT trends</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-purple-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo16.jpg" alt="News 4" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo17.jpg" alt="News 4" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo18.jpg" alt="News 4" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo19.jpg" alt="News 4" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo20.jpg" alt="News 4" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 5 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(5)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">5</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 5</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Web3 news</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-cyan-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo21.jpg" alt="News 5" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo22.jpg" alt="News 5" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo23.jpg" alt="News 5" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo24.jpg" alt="News 5" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo25.jpg" alt="News 5" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 6 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-red-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(6)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">6</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 6</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Blockchain tech</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-red-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo26.jpg" alt="News 6" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo27.jpg" alt="News 6" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo28.jpg" alt="News 6" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo29.jpg" alt="News 6" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo30.jpg" alt="News 6" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 7 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(7)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">7</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 7</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Trading insights</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-yellow-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo31.jpg" alt="News 7" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo32.jpg" alt="News 7" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo33.jpg" alt="News 7" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo34.jpg" alt="News 7" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo35.jpg" alt="News 7" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 8 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(8)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">8</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 8</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Regulation news</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-indigo-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo36.jpg" alt="News 8" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo37.jpg" alt="News 8" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo38.jpg" alt="News 8" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo39.jpg" alt="News 8" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo40.jpg" alt="News 8" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 9 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-pink-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(9)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">9</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 9</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Security updates</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-pink-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo41.jpg" alt="News 9" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo42.jpg" alt="News 9" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo43.jpg" alt="News 9" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo44.jpg" alt="News 9" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo45.jpg" alt="News 9" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-pink-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{selectedNews}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">News Article {selectedNews}</h3>
                  <p className="text-gray-400 text-sm">Crypto Club 69 - Latest Updates</p>
                </div>
              </div>
              <button
                onClick={closeNewsModal}
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[600px]">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-400 text-lg font-semibold">Loading News Article {selectedNews}...</p>
                    <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the content</p>
                  </div>
                </div>
              ) : (
                <div 
                  className="w-full min-h-[600px] border border-gray-600/30 rounded-2xl bg-black/50 backdrop-blur-sm p-6"
                  dangerouslySetInnerHTML={{ __html: newsContent }}
                  id="news-content"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}