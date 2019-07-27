import React from 'react'
import styled from 'styled-components'

export default class AccountCard extends React.Component {
  render() {
    const { title, amount } = this.props
    return (
      <div>
        <AccountCards>
          <AccountTitle>{title}</AccountTitle>
          <Amount>{amount}円</Amount>
        </AccountCards>
      </div>
    )
  }
}
const AccountCards = styled.div`
  width: 200px;
  height: 130px;
  border: medium solid #386cbf;
  margin: 20px;
`
const AccountTitle = styled.h5`
  color: #386cbf;
  margin: 10px;
  font-size: 18px;
`
const Amount = styled.span`
  color: #386cbf;
  margin: 10px;
  font-size: 25px;
`
