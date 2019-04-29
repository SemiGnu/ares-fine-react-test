/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import { css, } from '@emotion/core'
import { ITableHeader } from "../Table";

interface IProps {
    headers: ITableHeader[]
    callback?: any
}

const header: React.FC<IProps> = props => {

    const headerRowCss = css`
        display: flex;
        flex-direction: row;
        align-content:stretch;
        justify-content: space-between;
        width: 100%;
    `
    const headerCss = css`
        font-weight: 700;
    `
    const headers = props.headers.map(h => 
        <div key={h.name + 'Header'} css={headerCss} style={{ flexGrow: h.weight }} onClick={()=>props.callback(h.value)}>{h.name}</div>
    )
    
    return (
        <div css={headerRowCss}>
            {headers}
        </div>
    )
}

export default header