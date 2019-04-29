/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import { css } from '@emotion/core'
import { ITableHeader } from '../Table'

interface IState {

}

interface IProps {
    data: any
    headers: ITableHeader[]
}

class Row extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    rowCss = css`
    display: flex;
    flex-direction: row;
    align-content:left;
    width: 100%;
`
    cellCss = css`
    font-weight: 400;
`


    render() {
        const cells = this.props.headers.map(h => 
            <div css={this.cellCss} style={{ flexGrow: h.weight }}>
                {this.props.data[h.value]}
            </div>
        )

        return (
            <div css={this.rowCss}>
                {cells}
            </div>
        )
    }
}

export default Row