import React from 'react'
import Header from '../components/Header.js'
import AccountCard from '../components/AccountCard.js'
import Chart from 'react-google-charts'
import axios from 'axios'
import Cookies from 'universal-cookie'

export default class Index extends React.Component {
  static async getInitialProps(req) {
    const fetchData = async () => {
      const cookies = await new Cookies()
      let headers = await cookies.get('pass')

      return headers
    }

    const printData = async () => {
      try {
        let headers = await fetchData()
        const res = await axios.get('https://api-accounting-software.herokuapp.com/api/reports', {
          headers: { Authorization: `Bearer ${headers}` }
        })
        const response = await axios.get('https://api-accounting-software.herokuapp.com/api/amounts', {
          headers: { Authorization: `Bearer ${headers}` }
        })
        return { reports: res.data, amounts: response.data }
      } catch (e) {
        console.error('Problem', e)
      }
    }
    const datas = await printData()
    console.log(datas)
    console.log(req.headers)
    return datas
  }
  render() {
    const deposit = parseInt(
      this.props.amounts.journalsDebit['普通預金'].amount,
      10
    )
    const cash = parseInt(this.props.amounts.journalsDebit['現金'].amount, 10)

    const {
      sales2015,
      costOfSales2015,
      salesAdminExpense2015,
      salesProfit2015,
      sales2016,
      costOfSales2016,
      salesAdminExpense2016,
      salesProfit2016,
      sales2017,
      costOfSales2017,
      salesAdminExpense2017,
      salesProfit2017,
      sales2018,
      costOfSales2018,
      salesAdminExpense2018,
      salesProfit2018
    } = this.props.reports

    const options = {
      title: '損益レポート',
      legend: { position: 'bottom' }
    }
    const data = [
      ['Year', '売上', '売上原価', '販管費', '営業利益'],
      [
        '2015',
        sales2015,
        costOfSales2015,
        salesAdminExpense2015,
        salesProfit2015
      ],
      [
        '2016',
        sales2016,
        costOfSales2016,
        salesAdminExpense2016,
        salesProfit2016
      ],
      [
        '2017',
        sales2017,
        costOfSales2017,
        salesAdminExpense2017,
        salesProfit2017
      ],
      [
        '2018',
        sales2018,
        costOfSales2018,
        salesAdminExpense2018,
        salesProfit2018
      ]
    ]

    return (
      <div>
        <Header />
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ width: '20%', marginLeft: 30 }}>
            <AccountCard
              title={'口座残高合計'}
              amount={Number(cash + deposit).toLocaleString()}
            />
            <AccountCard
              title={'現金'}
              amount={Number(cash).toLocaleString()}
            />
            <AccountCard
              title={'普通預金'}
              amount={Number(deposit).toLocaleString()}
            />
          </div>

          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      </div>
    )
  }
}
