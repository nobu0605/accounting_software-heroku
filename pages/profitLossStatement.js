import React from 'react'
import Header from '../components/Header.js'
import axios from 'axios'
import styled from 'styled-components'

export default class profitLossStatement extends React.Component {
    static async getInitialProps() {
        const url = await import('../config.js')
        const response = await axios.get(`${url.apiUrl}/api/amounts`)
        const res = await axios.get(`${url.apiUrl}/api/reports`)
        return { amounts: response.data, profitLoss: res.data }
    }

    render() {
        const journalsCredit = this.props.amounts.journalsCredit
        const journalsDebit = this.props.amounts.journalsDebit
        const originJournalsDebit = this.props.amounts.originJournalsDebit
        const originJournalsCredit = this.props.amounts.originJournalsCredit
        const profitLoss = this.props.profitLoss

        const GrossProfit = profitLoss.sales - profitLoss.costOfSales
        const salesProfit = GrossProfit - profitLoss.salesAdminExpense
        const currentProfit =
            salesProfit - profitLoss.otherExpenses + profitLoss.otherIncome
        const currentIncomeBeforeTax =
            currentProfit - profitLoss.extraLoss + profitLoss.extraIncome
        const netIncome = currentIncomeBeforeTax - profitLoss.corporateTax

        return (
            <div>
                <Header />
                <h1 style={{ margin: 20 }}>損益計算書 </h1>
                <table style={{ margin: 20 }} border="1" rules="all">
                    <thead>
                        <tr>
                            <TableData>区分</TableData>
                            <TableData>項目</TableData>
                            <TableData>金額</TableData>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <TableData>
                                {journalsCredit['売上高'].type}
                            </TableData>
                            <TableData>
                                {journalsCredit['売上高'].account}
                            </TableData>
                            <TableData>
                                {Number(
                                    journalsCredit['売上高'].total
                                ).toLocaleString()}
                            </TableData>
                        </tr>
                        <tr>
                            <TableData>
                                {journalsDebit['仕入高'].type}
                            </TableData>
                            <TableData>
                                {journalsDebit['仕入高'].account}
                            </TableData>
                            <TableData>
                                {Number(
                                    journalsDebit['仕入高'].total
                                ).toLocaleString()}
                            </TableData>
                        </tr>
                        <tr style={{ background: '#d3d3d3' }}>
                            <TableData>売上総利益</TableData>
                            <TableData />
                            <TableData>
                                {Number(GrossProfit).toLocaleString()}
                            </TableData>
                        </tr>
                        {originJournalsDebit.map((journals, Index) => {
                            return (
                                journals.type == '販管費' && (
                                    <tr key={Index}>
                                        <TableData>{journals.type}</TableData>
                                        <TableData>
                                            {journals.account}
                                        </TableData>
                                        <TableData>
                                            {Number(
                                                journals.total
                                            ).toLocaleString()}
                                        </TableData>
                                    </tr>
                                )
                            )
                        })}
                        <tr style={{ background: '#d3d3d3' }}>
                            <TableData>営業利益</TableData>
                            <TableData />
                            <TableData>
                                {Number(salesProfit).toLocaleString()}
                            </TableData>
                        </tr>
                        {originJournalsCredit.map((journals, Index) => {
                            return (
                                journals.type == '営業外収益' && (
                                    <tr key={Index}>
                                        <TableData>{journals.type}</TableData>
                                        <TableData>
                                            {journals.account}
                                        </TableData>
                                        <TableData>
                                            {Number(
                                                journals.total
                                            ).toLocaleString()}
                                        </TableData>
                                    </tr>
                                )
                            )
                        })}
                        {originJournalsDebit.map((journals, Index) => {
                            return (
                                journals.type == '営業外費用' && (
                                    <tr key={Index}>
                                        <TableData>{journals.type}</TableData>
                                        <TableData>
                                            {journals.account}
                                        </TableData>
                                        <TableData>
                                            {Number(
                                                journals.total
                                            ).toLocaleString()}
                                        </TableData>
                                    </tr>
                                )
                            )
                        })}
                        <tr style={{ background: '#d3d3d3' }}>
                            <TableData>経常利益</TableData>
                            <TableData />
                            <TableData>
                                {Number(currentProfit).toLocaleString()}
                            </TableData>
                        </tr>
                        {originJournalsCredit.map((journals, Index) => {
                            return (
                                journals.type == '特別利益' && (
                                    <tr key={Index}>
                                        <TableData>{journals.type}</TableData>
                                        <TableData>
                                            {journals.account}
                                        </TableData>
                                        <TableData>
                                            {Number(
                                                journals.total
                                            ).toLocaleString()}
                                        </TableData>
                                    </tr>
                                )
                            )
                        })}
                        {originJournalsDebit.map((journals, Index) => {
                            return (
                                journals.type == '特別損失' && (
                                    <tr key={Index}>
                                        <TableData>{journals.type}</TableData>
                                        <TableData>
                                            {journals.account}
                                        </TableData>
                                        <TableData>
                                            {Number(
                                                journals.total
                                            ).toLocaleString()}
                                        </TableData>
                                    </tr>
                                )
                            )
                        })}
                        <tr style={{ background: '#d3d3d3' }}>
                            <TableData>税引前当期純利益利益</TableData>
                            <TableData />
                            <TableData>
                                {Number(
                                    currentIncomeBeforeTax
                                ).toLocaleString()}
                            </TableData>
                        </tr>
                        {originJournalsDebit.map((journals, Index) => {
                            return (
                                journals.type == '法人税等' && (
                                    <tr key={Index}>
                                        <TableData>{journals.type}</TableData>
                                        <TableData>
                                            {journals.account}
                                        </TableData>
                                        <TableData>
                                            {Number(
                                                journals.total
                                            ).toLocaleString()}
                                        </TableData>
                                    </tr>
                                )
                            )
                        })}
                        <tr style={{ background: '#d3d3d3' }}>
                            <TableData>当期純利益利益</TableData>
                            <TableData />
                            <TableData>
                                {Number(netIncome).toLocaleString()}
                            </TableData>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
const TableData = styled.td`
    height: 40px;
    padding: 10px;
    text-align: center;
`
