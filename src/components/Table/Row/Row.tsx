/** @jsx jsx */ import { jsx, css, keyframes } from '@emotion/core'
import React from 'react'
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
        margin: 5px 0 0 0;
        background-color: white;
    `
    cellCss = css`
        font-weight: 400;
    `
    extendAntimation = keyframes`
        from {transform: translateY(-200px)}
        to {transform: translateY(0)}
    `
    retractAntimation = keyframes`
        from {transform: translateY(0)}
        to {transform: translateY(-200px)}
    `
    extendCss = css`
        margin: 5px 0 0 0;
        padding: 0 20px;
        transform-origin: top;
        overflow:hidden;
    `
    extendCellCss = css`
        animation: ${this.state.open ? this.extendAntimation : this.retractAntimation} 1s ease once;
        font-size:14px;
    `


    toggleOpen = () => this.setState({ open: !this.state.open })

    render() {
        const cells = this.props.dataFormat.map(td => {
            let cell = null
            if (td.header) cell = <div key={td.variable} css={this.cellCss} style={{ flexGrow: td.weight, flexBasis: '100%' }}>
                {this.props.data[td.variable]}
            </div>
            return cell
        })
        const expand = this.props.dataFormat.map(td => {
            let display = null
            if (!td.header) display = <div key={td.variable} css={this.extendCellCss}>
                <strong>{td.name}: </strong>{this.props.data[td.variable].toString()}
            </div>
            return display
        })
        return (
            <div onClick={this.toggleOpen}>

                <div css={this.rowCss} >
                    {cells}
                </div>
                <div css={this.extendCss}>
                    {this.state.open ? expand : null}
                </div>
            </div>
        )
    }
}

export default Row