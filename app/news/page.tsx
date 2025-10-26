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
      {/* Main Content - Asymmetric Design - Mobile Optimized */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* News Categories - Mobile Optimized */}
          <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
            <div className="bg-black border-2 border-retro-blue/30 rounded-none p-4 sm:p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
              <div className="relative">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-retro-blue mb-4 sm:mb-6 md:mb-8 text-center font-mono tracking-wider transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  NEWS CATEGORIES
                </h3>
              
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {/* Category 1 - Bitcoin */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-orange-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-orange-500 text-sm sm:text-base">₿</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">BITCOIN</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Latest BTC news</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 2 - Ethereum */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-blue-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-blue-500 text-sm sm:text-base">Ξ</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">ETHEREUM</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">ETH ecosystem</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 3 - DeFi */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-green-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-green-500 text-sm sm:text-base">D</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">DEFI</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Decentralized finance</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 4 - NFT */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-purple-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-purple-500 text-sm sm:text-base">N</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">NFT</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Digital collectibles</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 5 - Web3 */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-cyan-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-cyan-500 text-sm sm:text-base">W</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">WEB3</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Next-gen internet</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 6 - Blockchain */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-red-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-red-500 text-sm sm:text-base">B</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">BLOCKCHAIN</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Core technology</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 7 - Trading */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-yellow-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-yellow-500 text-sm sm:text-base">T</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">TRADING</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Market analysis</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 8 - Regulation */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-indigo-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-indigo-500 text-sm sm:text-base">R</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">REGULATION</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Legal updates</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 9 - Security */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-pink-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-pink-500 text-sm sm:text-base">S</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">SECURITY</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Cybersecurity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Articles Grid - Mobile Optimized */}
          <div className="mt-6 sm:mt-8 md:mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {/* News 1 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-orange-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(1)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 1</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Latest updates</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-orange-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo1.jpg" alt="News 1" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo2.jpg" alt="News 1" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo3.jpg" alt="News 1" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo4.jpg" alt="News 1" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo5.jpg" alt="News 1" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 2 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(2)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 2</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Market insights</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-blue-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo6.jpg" alt="News 2" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo7.jpg" alt="News 2" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo8.jpg" alt="News 2" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo9.jpg" alt="News 2" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo10.jpg" alt="News 2" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 3 */}
              <div 
                className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-green-500/50 transition-colors group cursor-pointer"
                onClick={() => openNewsModal(3)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 3</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">DeFi updates</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <div className="w-full h-32 border border-green-500/30 rounded overflow-hidden">
                    <div className="flex h-full">
                      <img src="/dropbox-downloads/photo11.jpg" alt="News 3" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo12.jpg" alt="News 3" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo13.jpg" alt="News 3" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo14.jpg" alt="News 3" className="w-1/5 h-full object-cover" />
                      <img src="/dropbox-downloads/photo15.jpg" alt="News 3" className="w-1/5 h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-bold text-lg">News Article {selectedNews}</h3>
              <button
                onClick={closeNewsModal}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div 
                className="w-full min-h-[600px] border border-gray-600 rounded bg-black"
                dangerouslySetInnerHTML={{
                  __html: isLoading ? `
                    <div style="
                      background: #000000;
                      color: #00ff41;
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      padding: 20px;
                      line-height: 1.6;
                      min-height: 600px;
                    ">
                      <div style="text-align: center; padding: 40px;">
                        <div style="
                          width: 60px;
                          height: 60px;
                          border: 3px solid #00ff41;
                          border-top: 3px solid transparent;
                          border-radius: 50%;
                          animation: spin 1s linear infinite;
                          margin: 0 auto 20px;
                        "></div>
                        <p style="color: #00ff41; font-size: 18px; margin: 0;">Loading News Article ${selectedNews}...</p>
                      </div>
                      <style>
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                      </style>
                    </div>
                  ` : newsContent
                }}
                id="news-content"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}