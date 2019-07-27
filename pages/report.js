import React from 'react'
import Header from '../components/Header.js'
import { RadialChart } from 'react-vis'
import axios from 'axios'

export default class Report extends React.Component {
  static async getInitialProps() {
    const res = await axios.get(
      'https://api-accounting-software.herokuapp.com/api/reports'
    )
    return { reports: res.data }
  }
  render() {
    let reportsData = this.props.reports

    const CAPercent = Math.round(reportsData.CAPercent * 100)
    const FAPercent = Math.round(reportsData.FAPercent * 100)

    const assetsData = [
      {
        angle: CAPercent / 10,
        label: `流動資産 ${CAPercent}%`,
        color: '#3cb371'
      },
      {
        angle: FAPercent / 10,
        label: `固定資産 ${FAPercent}%`,
        color: '#00bfff'
      }
    ]

    const CLPercent = Math.round(reportsData.CLPercent * 100)
    const FLPercent = Math.round(reportsData.FLPercent * 100)
    const EPercent = Math.round(reportsData.EPercent * 100)
    const equityData = [
      {
        angle: CLPercent / 10,
        label: `流動負債 ${CLPercent}%`,
        color: '#ffa500'
      },
      {
        angle: FLPercent / 10,
        label: `固定負債 ${FLPercent}%`,
        color: '#00bfff'
      },
      { angle: EPercent / 10, label: `純資産 ${EPercent}%`, color: '#3cb371' }
    ]
    const SPPercent = Math.round(reportsData.SPPercent * 100)
    const COSPercent = Math.round(reportsData.COSPercent * 100)
    const SAEPercent = Math.round(reportsData.SAEPercent * 100)
    const salesProfitData = [
      {
        angle: COSPercent / 10,
        label: `売上原価 ${COSPercent}%`,
        color: '#ffa500'
      },
      {
        angle: SAEPercent / 10,
        label: `販管費 ${SAEPercent}%`,
        color: '#00bfff'
      },
      {
        angle: SPPercent / 10,
        label: `営業利益 ${SPPercent}%`,
        color: '#3cb371'
      }
    ]

    return (
      <div>
        <Header />
        <h1 style={{ margin: 20 }}>レポート</h1>
        <div style={{ display: 'flex', margin: 20 }}>
          <RadialChart
            colorType="literal"
            data={assetsData}
            width={300}
            height={300}
            showLabels={true}
            labelsStyle={{
              fill: '#222',
              fontSize: 22
            }}
          />
          <RadialChart
            colorType="literal"
            data={equityData}
            width={300}
            height={300}
            showLabels={true}
            labelsStyle={{
              fill: '#222',
              fontSize: 22
            }}
          />
          <RadialChart
            colorType="literal"
            data={salesProfitData}
            width={300}
            height={300}
            showLabels={true}
            labelsStyle={{
              fill: '#222',
              fontSize: 22
            }}
          />
        </div>
      </div>
    )
  }
}
