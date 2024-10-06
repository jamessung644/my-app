'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUpIcon, ChevronDownIcon, LayoutGridIcon, ListIcon, InfoIcon } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const etfData = {
  name: "미래에셋TIGER미국배당다우존스증권상장지수투자신탁(주식)",
  code: "458730",
  nav: 12015.73,
  navChange: 116.67,
  navChangePercent: 0.96,
  price: 12000,
  priceChange: 130.0,
  priceChangePercent: 1.07,
  volume: 629063,
  aum: 1378505661916,
  firstListingDate: "2023-06-20",
  benchmark: "Dow Jones U.S. Dividend 100 지수(원화환산)(Price Return)",
  managementGoal: "\"Dow Jones U.S. Dividend 100 지수(원화환산)(Price Return)\"를 기초지수로 하여 1좌당 순자산가치의 변동률을 기초지수의 변동률과 연동하여 운용함을 목적으로 합니다",
  managementMethod: "이 투자신탁은 S&P Dow Jones Indices에서 발표하는 \"Dow Jones U.S. Dividend 100 지수(원화환산)(Price Return)\"를 기초지수로 하는 상장지수투자신탁으로서, 미국에 상장된 주식에 투자신탁 자산총액의 60% 이상 투자합니다. 이 투자신탁은 해외 주식에 투자하면서도 환헤지를 하지 않으므로 1좌당 순자산가치는 기초지수의 원화환산 수익률에 연동하게 됩니다.",
  hedging: "환헤지를 실시하지 않습니다",
  creationUnit: 50000,
  totalExpenseRatio: 0.01,
  taxInfo: "매매차익은 배당소득세 과세(보유기간 과세) : Min(매매차익, 과표 증분) X 15.4% 분배금은 배당소득세 과세 : Min(현금분배금, 과표증분) X 15.4%",
  dividendPaymentDate: "- 지급기준일 : 매월 마지막영업일, 회계기간종료일(비영업일인경우 직전영업일)\n- 지급시기 : 지급기준일 익영업일로부터 제7영업일 이내",
  authorizedParticipants: "BNK투자증권, KB증권, NH투자증권, 메리츠증권, 미래에셋증권, 삼성증권, 신한투자증권, 이베스트투자증권, 키움증권, 한국투자증권, 한화투자증권",
  liquidityProviders: "BNK투자증권, KB증권, NH투자증권, 미래에셋증권, 삼성증권, 신한투자증권, 이베스트투자증권, 키움증권, 한국투자증권, 한화투자증권",
  holdings: [
    { name: "Apple Inc.", weight: 7.21, change: 2.5, price: 191.45, dividend: 0.96 },
    { name: "Microsoft Corporation", weight: 6.98, change: -1.2, price: 374.51, dividend: 2.72 },
    { name: "Amazon.com Inc.", weight: 3.41, change: 1.8, price: 146.32, dividend: 0 },
    { name: "NVIDIA Corporation", weight: 3.11, change: -0.5, price: 470.77, dividend: 0.16 },
    { name: "Alphabet Inc. Class A", weight: 2.01, change: 3.2, price: 138.21, dividend: 0 },
  ],
  historicalData: [
    { date: "2023-01-01", price: 380 },
    { date: "2023-02-01", price: 395 },
    { date: "2023-03-01", price: 385 },
    { date: "2023-04-01", price: 410 },
    { date: "2023-05-01", price: 420 },
    { date: "2023-06-01", price: 440 },
    { date: "2023-07-01", price: 452.19 },
  ],
}

const MotionDiv = motion.div

export function EtfMonitor() {
  const [investment, setInvestment] = useState('')
  const [comparisonResult, setComparisonResult] = useState(null)
  const [isCardView, setIsCardView] = useState(true)

  const handleComparison = () => {
    const mockResult = {
      etf1Return: 15.2,
      etf2Return: 12.8
    }
    setComparisonResult(mockResult)
  }

  const toggleView = () => {
    setIsCardView(!isCardView)
  }

  const CardView = ({ holding, index }) => (
    <MotionDiv
      key={index}
      className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-3">{holding.name}</h3>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">비중: {holding.weight}%</span>
        <span className={`flex items-center ${holding.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {holding.change >= 0 ? <ChevronUpIcon className="w-4 h-4 mr-1" /> : <ChevronDownIcon className="w-4 h-4 mr-1" />}
          {Math.abs(holding.change)}%
        </span>
      </div>
    </MotionDiv>
  )

  const ListView = ({ holding, index }) => (
    <MotionDiv
      key={index}
      className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-lg font-semibold">{holding.name}</h3>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">비중: {holding.weight}%</span>
        <span className={`flex items-center ${holding.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {holding.change >= 0 ? <ChevronUpIcon className="w-4 h-4 mr-1" /> : <ChevronDownIcon className="w-4 h-4 mr-1" />}
          {Math.abs(holding.change)}%
        </span>
      </div>
    </MotionDiv>
  )

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-tight">{etfData.name}</h1>
            <span className="text-xl font-semibold text-gray-600">{etfData.code}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>기준가격 (NAV)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{etfData.nav.toLocaleString()}원</p>
                <p className={`flex items-center ${etfData.navChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {etfData.navChange >= 0 ? <ChevronUpIcon className="w-4 h-4 mr-1" /> : <ChevronDownIcon className="w-4 h-4 mr-1" />}
                  {Math.abs(etfData.navChange)}원 ({etfData.navChangePercent}%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>주당 시장가격</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{etfData.price.toLocaleString()}원</p>
                <p className={`flex items-center ${etfData.priceChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {etfData.priceChange >= 0 ? <ChevronUpIcon className="w-4 h-4 mr-1" /> : <ChevronDownIcon className="w-4 h-4 mr-1" />}
                  {Math.abs(etfData.priceChange)}원 ({etfData.priceChangePercent}%)
                </p>
              </CardContent>
            </Card>
          </div>
        </header>
        
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

        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold tracking-tight">주요 구성종목</h2>
            <div className="flex items-center space-x-2">
              <ListIcon className={`w-5 h-5 ${!isCardView ? 'text-blue-500' : 'text-gray-400'}`} />
              <Switch
                checked={isCardView}
                onCheckedChange={toggleView}
                className="data-[state=checked]:bg-blue-500"
              />
              <LayoutGridIcon className={`w-5 h-5 ${isCardView ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            {isCardView ? (
              <MotionDiv
                key="card-view"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {etfData.holdings.map((holding, index) => (
                  <CardView key={index} holding={holding} index={index} />
                ))}
              </MotionDiv>
            ) : (
              <MotionDiv
                key="list-view"
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {etfData.holdings.map((holding, index) => (
                  <ListView key={index} holding={holding} index={index} />
                ))}
              </MotionDiv>
            )}
          </AnimatePresence>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">상세 종목 정보</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>종목명</TableHead>
                <TableHead>비중</TableHead>
                <TableHead>현재가</TableHead>
                <TableHead>등락률</TableHead>
                <TableHead>배당금</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {etfData.holdings.map((holding, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{holding.name}</TableCell>
                  <TableCell>{holding.weight}%</TableCell>
                  <TableCell>${holding.price}</TableCell>
                  <TableCell className={holding.change >= 0 ? 'text-green-600' : 'text-red-500'}>
                    {holding.change >= 0 ? '+' : ''}{holding.change}%
                  </TableCell>
                  <TableCell>${holding.dividend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">ETF 상세 정보</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>기본 정보</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ETF 명칭</TableCell>
                      <TableCell>{etfData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">종목코드</TableCell>
                      <TableCell>{etfData.code}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">순자산규모</TableCell>
                      <TableCell>{etfData.aum.toLocaleString()}원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">거래량</TableCell>
                      <TableCell>{etfData.volume.toLocaleString()}주</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">최초상장일</TableCell>
                      <TableCell>{etfData.firstListingDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">기초지수</TableCell>
                      <TableCell>{etfData.benchmark}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>운용 정보</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">운용목표</TableCell>
                      <TableCell>{etfData.managementGoal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">운용방법</TableCell>
                      <TableCell>{etfData.managementMethod}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">환헤지 사항</TableCell>
                      <TableCell>{etfData.hedging}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">설정단위(CU)</TableCell>
                      <TableCell>{etfData.creationUnit.toLocaleString()}주</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">총보수</TableCell>
                      <TableCell>연 {etfData.totalExpenseRatio}%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>세금 및 분배금</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">과세내용</TableCell>
                      <TableCell>{etfData.taxInfo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">분배금 지급 기준일</TableCell>
                      <TableCell>{etfData.dividendPaymentDate}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>참가회사 및 유동성공급자</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">지정참가회사(AP)</TableCell>
                      <TableCell>{etfData.authorizedParticipants}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">유동성공급자(LP)</TableCell>
                      <TableCell>{etfData.liquidityProviders}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-gray-50 rounded-3xl p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">ETF 비교 분석</h2>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              placeholder="투자 금액 입력"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="flex-grow rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
            />
            <Button 
              onClick={handleComparison} 
              className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition-colors duration-300"
            >
              비교 분석
            </Button>
          </div>
          {comparisonResult && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-inner space-y-2"
            >
              <p className="text-gray-800">ETF 1 수익률: <span className="font-semibold text-blue-600">{comparisonResult.etf1Return}%</span></p>
              <p className="text-gray-800">ETF 2 수익률: <span className="font-semibold text-blue-600">{comparisonResult.etf2Return}%</span></p>
            </MotionDiv>
          )}
        </section>
      </div>
    </div>
  )
}