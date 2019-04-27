import React from 'react'
// import { css } from '@emotion/core'

export interface ITableData {
    data: any[]
    headers: {
        name: string
        value: string
        weight: number
    }[]
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

    componentDidUpdate() {
        //console.log(this.props.tableData.data[0]['name']['last'])
    }

    render() {
        return (
            null
        )
    }
}

export default Table