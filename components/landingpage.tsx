import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [etfData, setEtfData] = useState<any>(null);

  const handleSearch = () => {
    // Mocked ETF data, replace with API call if needed
    const mockData = {
      name: "미래에셋TIGER미국배당다우존스증권상장지수투자신탁",
      code: "458730",
      nav: 12015.73,
      navChange: 116.67,
      navChangePercent: 0.96,
      price: 12000,
      priceChange: 130.0,
      priceChangePercent: 1.07,
      historicalData: [
        { date: "2023-01-01", price: 380 },
        { date: "2023-02-01", price: 395 },
        { date: "2023-03-01", price: 385 },
        { date: "2023-04-01", price: 410 },
        { date: "2023-05-01", price: 420 },
        { date: "2023-06-01", price: 440 },
        { date: "2023-07-01", price: 452.19 },
      ],
    };
    setEtfData(mockData);
  };

  return (
    <div className="min-h-screen p-8 bg-white font-sans text-gray-900">
      <header className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">ETF 검색</h1>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="ETF 이름 또는 코드 입력"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
          />
          <Button onClick={handleSearch} className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition-colors duration-300">
            검색
          </Button>
        </div>
      </header>

      {etfData && (
        <div className="max-w-4xl mx-auto space-y-16 mt-16">
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold tracking-tight">{etfData.name}</h1>
              <span className="text-xl font-semibold text-gray-600">{etfData.code}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Card className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <CardTitle>기준가격 (NAV)</CardTitle>
                <CardContent>
                  <p className="text-2xl font-semibold">{etfData.nav.toLocaleString()}원</p>
                  <p className={`flex items-center ${etfData.navChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {etfData.navChange >= 0 ? '+' : ''}{etfData.navChange}원 ({etfData.navChangePercent}%)
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <CardTitle>주당 시장가격</CardTitle>
                <CardContent>
                  <p className="text-2xl font-semibold">{etfData.price.toLocaleString()}원</p>
                  <p className={`flex items-center ${etfData.priceChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {etfData.priceChange >= 0 ? '+' : ''}{etfData.priceChange}원 ({etfData.priceChangePercent}%)
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight">가격 추이</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={etfData.historicalData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default LandingPage;