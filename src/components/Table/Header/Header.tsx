/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import React from 'react'
import { ITableDataFormat } from "../Table";

interface IProps {
    dataFormat: ITableDataFormat[]
    callback?: any
    sortBy: string
    ascending: boolean
}

const header: React.FC<IProps> = props => {

    const headerRowCss = css`
        display: flex;
        flex-direction: row;
        align-content:space-evenly;
        
        width: 100%;
    `
    const headerCss = css`
        font-weight: 700;
        color:#333;
    `
    const headers = props.dataFormat.map((h, index) => {
        if (h.header) return <div
            key={index}
            css={headerCss}
            style={{ flexGrow: h.weight, flexBasis: '100%' }}
            onClick={() => props.callback(h.variable)}
        >{h.name} {props.sortBy === h.variable ? (props.ascending ? <strong>&darr;</strong> : <strong>&uarr;</strong>) : null}</div>
        else return null
    })

    return (
        <div css={headerRowCss}>
            {headers}
        </div>
    )
}

export default header