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
        const context = chartRef.current.getContext('2d')

        if (context) {
          const newChart = new Chart(context, {
            type: 'radar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: '장르별 음악 선호도',
                  data: preferenceData,
                  borderColor: 'green',
                  borderWidth: 3,
                  pointBackgroundColor: 'rgb(56, 238, 65)',
                  pointBorderColor: '#fff',
                },
                {
                  label: '장르별 음악 비선호도',
                  data: dislikeData,
                  borderColor: 'red',
                  borderWidth: 3,
                  pointBackgroundColor: 'rgb(255, 64, 64)',
                  pointBorderColor: '#fff',
                },
              ],
            },
            options: {
              scales: {
                r: {
                  angleLines: {
                    color: 'white',
                  },
                  grid: {
                    color: 'white',
                  },
                  pointLabels: {
                    color: 'white',
                  },
                  ticks: {
                    color: 'blue',
                  },
                },
              },
              responsive: false,
              plugins: {
                title: {
                  display: true,
                  text: '당신의 퍼스널 뮤직 진단 결과',
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
    <div className=' flex justify-center pt-[15px]'>
      <canvas
        ref={chartRef}
        width={400}
        height={300}
        style={{ backgroundColor: 'black' }}
      />
    </div>
  )
}

export default ResultChart
