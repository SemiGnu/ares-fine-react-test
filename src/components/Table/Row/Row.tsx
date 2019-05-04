/** @jsx jsx */
import { jsx, css, keyframes, SerializedStyles } from '@emotion/core'
import React from 'react'
import { ITableDataFormat } from '../Table'

interface IState {
    open: boolean
    cellCss: SerializedStyles
}

interface IProps {
    data: any
    dataFormat: ITableDataFormat[]
    shaded: boolean
}

class Row extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false,
            cellCss: css`
                display:none;
            `
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
        from {transform: scaleY(0);max-height:0;}
        to {transform: scaleY(1);max-height:500px;}
    `
    retractAntimation = keyframes`
        from {transform: scaleY(1);max-height:500px;}
        to {transform: scaleY(0);max-height:0;}
    `
    extendCss = css`
        margin: 5px 0 0 0;
        padding: 0 20px;
    `
    extendCellCss = css`
        ${this.extendCss}
        transform-origin: 100% 0%;
        animation: ${this.extendAntimation} 400ms ease-in;
        font-size:14px; 
    `
    retractCellCss = css`
        ${this.extendCss}
        transform:scaleY(0);
        max-height: 0;
        transform-origin: 100% 0%;
        animation: ${this.retractAntimation} 400ms ease;
        font-size:14px; 
    `

    toggleOpen = () => {
        if (this.state.open) {
            this.setState({ open: false, cellCss: this.retractCellCss })
        } else {
            this.setState({ open: true, cellCss: this.extendCellCss })
        }
    }

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
            if (!td.header) display = <div key={td.variable}>
                <strong>{td.name}: </strong>{this.props.data[td.variable].toString()}
            </div>
            return display
        })
        return (
            <div
                onClick={this.toggleOpen}
            >
                <div css={this.rowCss} >
                    {cells}
                </div>
                <div css={this.state.cellCss}>
                    {expand}
                </div>
            </div>
        )
    }
}

export default Row