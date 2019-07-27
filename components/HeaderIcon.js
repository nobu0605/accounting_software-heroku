import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartPie,
    faHome,
    faBookOpen,
    faBook,
    faPen
} from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faHome, faBookOpen, faBook, faPen)

export default class HeaderIcon extends Component {
    render() {
        const { icon } = this.props

        return (
            <FontAwesomeIcon
                icon={icon}
                style={{
                    width: 20,
                    height: 20,
                    paddingRight: 5
                }}
            />
        )
    }
}
