/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import { css } from '@emotion/core'
import { ITableDataFormat } from '../Table'

interface IState {
    open: boolean
   
}

interface IProps {
    data: any
    dataFormat: ITableDataFormat[]
}

class Row extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false,
        }
    }

    rowCss = css`
    display: flex;
    flex-direction: row;
    align-content:left;
        justify-content: space-between
        width: 100%;
`
    cellCss = css`
    font-weight: 400;
`
    toggleOpen = () => this.setState({ open: !this.state.open })

    render() {
        const cells = this.props.dataFormat.map(td => {
            let cell = null
            if (td.header) cell = <div key={td.variable} css={this.cellCss} style={{ flexGrow: td.weight }}>
                {this.props.data[td.variable]}
            </div>
            return cell
        })
        const expand = this.props.dataFormat.map(td => {
            let display = null
            if (!td.header) display = <div key={td.variable}>
                <strong>{td.name}: </strong>{this.props.data[td.variable].toString()}
            </div>
            return display
        })
        return (
            <div onClick={this.toggleOpen}>

                <div css={this.rowCss} >
                    {cells}
                </div>
                {this.state.open ? expand : null}
            </div>
        )
    }
}

export default Row