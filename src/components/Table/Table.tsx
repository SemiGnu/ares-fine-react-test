/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import Header from './Header/Header'
import Row from './Row/Row'
import { css } from '@emotion/core'

export interface ITableData {
    data: any[]
    headers: ITableHeader[]
    expandables: IExpandable[]
    searchables: ISearchable
}

export interface ITableHeader {
    name: string
    value: string
    weight: number
}

export interface ISearchable {
    text: string[]
    number: string[]
    checkbox: string[]
}

export interface IExpandable {
    name: string
    value: string
}

interface IState {
    sortBy: string
    sortAscending: boolean
    textFilter: string
    textFilterBy: string
    numberFilterBy: string
    numberFilterType: string
    numberFilter: number
}

interface IProps {
    tableData: ITableData
}

class Table extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {
            sortBy: this.props.tableData.headers[0].value,
            sortAscending: true,
            textFilterBy: this.props.tableData.headers[0].value,
            textFilter: '',
            numberFilterBy: this.props.tableData.searchables.number[0],
            numberFilterType: 'gt',
            numberFilter: 0
        }
    }

    tableCss = css`
        width: 1000px;
    `

    componentDidUpdate() {
        //console.log(this.props.tableData.data[0]['name']['last'])
    }

    setSort = (name: string) => {
        if (name === this.state.sortBy) {
            this.setState({ sortAscending: !this.state.sortAscending })
        } else {
            this.setState({ sortBy: name })
        }
    }

    sort = (a: any, b: any) => {
        // console.log(a ,this.state.sortBy)
        const s = a[this.state.sortBy].toString().localeCompare(b[this.state.sortBy].toString())
        return this.state.sortAscending ? s : -s
    }

    textFilter = (d: any) => d[this.state.textFilterBy].toLowerCase().includes(this.state.textFilter.toLowerCase())
    numberFilter = (d: any) => {
        let p
        switch (this.state.numberFilterType) {
            case 'gt':
                p = d[this.state.numberFilterBy] > this.state.numberFilter;
                break
            case 'eq':
                p =  d[this.state.numberFilterBy] === this.state.numberFilter;
                break
            case 'lt':
                p = d[this.state.numberFilterBy] < this.state.numberFilter;
                break
            default:
                p = true
        }
        return p
    }


    textFilterChangedHandler = (event: any) => this.setState({ textFilter: event.target.value })
    textFilterByChangedHandler = (event: any) => this.setState({ textFilterBy: event.target.value })
    numberFilterChangedHandler = (event: any) => {
        console.log(Number(event.target.value))
        this.setState({ numberFilter: Number(event.target.value) })
    }
    numberFilterByChangedHandler = (event: any) => this.setState({ numberFilterBy: event.target.value })
    numberFilterTypeChangedHandler = (event: any) => this.setState({ numberFilterType: event.target.value })


    render() {
        const rows = this.props.tableData.data
            .filter(this.textFilter)
            .filter(this.numberFilter)
            .sort(this.sort)
            .map(td =>
                <Row data={td} headers={this.props.tableData.headers} expandables={this.props.tableData.expandables} />
            )
        const textFilterOptions = this.props.tableData.searchables.text.map(t =>
            <option value={t}>{t}</option>
        )
        const numberFilterOptions = this.props.tableData.searchables.number.map(t =>
            <option value={t}>{t}</option>
        )
        return (
            <React.Fragment>
                <select value={this.state.textFilterBy} onChange={this.textFilterByChangedHandler}>{textFilterOptions}</select>
                <input type='text' value={this.state.textFilter} onChange={this.textFilterChangedHandler} />
                <br />
                <select value={this.state.numberFilterBy} onChange={this.numberFilterByChangedHandler} >{numberFilterOptions}</select>
                <select value={this.state.numberFilterType} onChange={this.numberFilterTypeChangedHandler} >
                    <option value='gt'>></option>
                    <option value='eq'>=</option>
                    <option value='lt'>{'<'}</option>
                </select>
                <input type='number' value={this.state.numberFilter} onChange={this.numberFilterChangedHandler} />
                <br />
                <br />
                <div css={this.tableCss}>
                    <Header headers={this.props.tableData.headers} callback={this.setSort} />
                    {rows}
                </div>
            </React.Fragment>
        )
    }
}

export default Table