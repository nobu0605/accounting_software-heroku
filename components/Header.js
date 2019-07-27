import React from 'react'
import styled from 'styled-components'
import Head from '../components/Head.js'
import HeaderIcon from '../components/HeaderIcon.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartPie,
  faHome,
  faBookOpen,
  faBook,
  faPen,
  faSignal,
  faCog
} from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faHome, faBookOpen, faBook, faPen, faSignal, faCog)
import Link from 'next/link'

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <HeaderContainer>
          <HeaderTitle>
            <FontAwesomeIcon
              icon="chart-pie"
              style={{
                width: 40,
                height: 40
              }}
            />
            <Link href="/" passHref>
              <a>
                <span style={{ color: '#386cbf' }}>&nbsp;Accounting</span>
              </a>
            </Link>
          </HeaderTitle>
          <HeaderMenu>
            <Link href="/" passHref>
              <a>
                <MenuList>
                  <HeaderIcon icon="home" />
                  Home
                </MenuList>
              </a>
            </Link>
            <Link href="/profitLossStatement" passHref>
              <a>
                <MenuList>
                  <HeaderIcon icon="book-open" />
                  損益計算書
                </MenuList>
              </a>
            </Link>
            <Link href="/list" passHref>
              <a>
                <MenuList>
                  <HeaderIcon icon="book" />
                  仕訳日記帳
                </MenuList>
              </a>
            </Link>
            <Link href="/journal" passHref>
              <a>
                <MenuList>
                  <HeaderIcon icon="pen" />
                  取引
                </MenuList>
              </a>
            </Link>
            <Link href="/report" passHref>
              <a>
                <MenuList>
                  <HeaderIcon icon="signal" />
                  レポート
                </MenuList>
              </a>
            </Link>
            <Link href="/config" passHref>
              <a>
                <MenuList>
                  <HeaderIcon icon="cog" />
                  設定
                </MenuList>
              </a>
            </Link>
          </HeaderMenu>
        </HeaderContainer>
        <div style={{ height: 10 }} />
      </div>
    )
  }
}

const HeaderTitle = styled.h1`
  font-size: 40px;
  text-align: left;
  margin-left: 25px;
  margin-right: 10px;
  margin-bottom: 15px;
  font-family: Pacifico;
  color: #386cbf;
`
const HeaderMenu = styled.div`
  background: #386cbf;
  height: 40px;
  display: flex;
  align-items: center;
`
const MenuList = styled.span`
  font-size: 15px;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  cursor: hand;
`
const HeaderContainer = styled.div`
  width: 100%;
  top: 0px;
  background: white;
`
