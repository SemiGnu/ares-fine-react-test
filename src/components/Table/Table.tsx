/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import Header from './Header/Header'
import Row from './Row/Row'
import { css } from '@emotion/core'

export interface ITableData {
    data: any[]
    headers: ITableHeader[]
}

export interface ITableHeader {
    name: string
    value: string
    weight: number
}

interface IState {

}

interface IProps {
    tableData: ITableData
}

class Table extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    tableCss = css`
        width: 1000px;
    `

    componentDidUpdate() {
        //console.log(this.props.tableData.data[0]['name']['last'])
    }

    render() {
        const rows = this.props.tableData.data.map(td =>
            <Row data={td} headers={this.props.tableData.headers} />
        )
        return (
            <div css={this.tableCss}>
                <Header headers={this.props.tableData.headers} />
                {rows}
            </div>
        )
    }
}

export default Table