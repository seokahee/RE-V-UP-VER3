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
                  // backgroundColor: ['rgb(56, 238, 65,0.2)'],
                  borderColor: 'green',
                  borderWidth: 3,
                  pointBackgroundColor: 'rgb(56, 238, 65)', //호버 전 동그라미 색
                  pointBorderColor: '#fff', //호버 전 동그라미 바깥 선
                  pointHoverBackgroundColor: '#acaa45', //호버 시 동그라미 색
                  pointHoverBorderColor: 'rgb(44, 238, 60)', //호버시 동그라미 바깥 선
                },
                {
                  label: '장르별 음악 비선호도',
                  data: dislikeData,
                  // backgroundColor: ['rgb(255,159,64,0.2)'],
                  borderColor: 'red',
                  borderWidth: 3,
                  pointBackgroundColor: 'rgb(255, 64, 64)', //호버 전 동그라미 색
                  pointBorderColor: '#fff', //호버 전 동그라미 바깥 선
                },
              ],
            },
            options: {
              scales: {
                r: {
                  //안에서 꼭짓점 오각형으로 나가는 선
                  angleLines: {
                    color: 'white',
                  },
                  grid: {
                    //거미줄 처럼 각 선, 배열도 가능함!
                    color: 'white',
                  },
                  pointLabels: {
                    color: 'blue',
                  },
                  ticks: {
                    color: 'black',
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
    <div className=' flex justify-center '>
      <canvas
        ref={chartRef}
        width={400}
        height={400}
        style={{ backgroundColor: 'black' }}
      />
    </div>
  )
}

export default ResultChart
