/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import { css } from '@emotion/core'
import { ITableHeader, IExpandable } from '../Table'

interface IState {
    open: boolean
   
}

interface IProps {
    data: any
    headers: ITableHeader[]
    expandables: IExpandable[]
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
    toggleOpen = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const cells = this.props.headers.map(h =>
            <div key={h.name} css={this.cellCss} style={{ flexGrow: h.weight }}>
                {this.props.data[h.value]}
            </div>
        )

        const expand = this.props.expandables.map(e =>
            <div>{e.name}: {this.props.data[e.value].toString()}</div>
        )

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