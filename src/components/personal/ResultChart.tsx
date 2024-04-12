import { useRef, useEffect } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPreference, getDislike } from '@/shared/personal/personalApi'

import type { ResultChartProps } from '@/types/personal/type'

const ResultChart: React.FC<ResultChartProps> = ({ userChar }) => {
  const mbtiStatus = userChar.mbti

  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  const { data: preference } = useQuery({
    queryFn: () => getPreference(mbtiStatus),
    queryKey: ['preference'],
  })

  const { data: dislike } = useQuery({
    queryFn: () => getDislike(mbtiStatus),
    queryKey: ['dislike'],
  })

  useEffect(() => {
    if (preference && dislike) {
      const labels = Object.keys(preference)
      const preferenceData = Object.values(preference)
      const dislikeData = Object.values(dislike)

      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }
        const context = chartRef.current.getContext('2d') // null 체크 없이 진행

        if (context) {
          const newChart = new Chart(context, {
            type: 'radar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: '장르별 음악 선호도',
                  data: preferenceData,
                  backgroundColor: ['rgb(255,99,132,0.2)'],
                  borderColor: 'blue',
                  borderWidth: 1,
                },
                {
                  label: '장르별 음악 비선호도',
                  data: dislikeData,
                  backgroundColor: ['rgb(255,159,64,0.2)'],
                  borderColor: 'red',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: '퍼스널 뮤직 진단 결과',
                },
              },
            },
          } as ChartConfiguration)

          chartInstance.current = newChart
        }
      }
    }
  }, [preference, dislike, chartRef.current])

  return (
    <div>
      <canvas ref={chartRef} style={{ width: '500px', height: '500px' }} />
    </div>
  )
}

export default ResultChart
