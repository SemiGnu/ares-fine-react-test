/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import Header from './Header/Header'
import Row from './Row/Row'
import TextFilter from './FilterControls/TextFilter'
import NumberFilter from './FilterControls/NumberFilter'
import DateFilter from './FilterControls/DateFilter';
import { css } from '@emotion/core'

export interface ITableData {
    data: any[]
    dataFormat: ITableDataFormat[]
}

export enum FilterType {
    searchString,
    number,
    date,
    checkbox
}

export enum ComparatorType {
    gt,
    eq,
    lt
}

export interface ITableDataFormat {
    variable: string
    name: string
    header: boolean
    weight: number
    filterType: FilterType
    defaultFilter?: any
}

interface IState {
    sortBy: string
    sortAscending: boolean
    filter: {
        textFilter: string
        textFilterBy: string
        numberFilterBy: string
        numberFilterType: ComparatorType
        numberFilter: number
        dateFilterBy: string
        dateFilterType: ComparatorType
        dateFilter: Date
        checkboxSets: {
            name: string,
            values: { value: string, checked: boolean }[]
        }[]
    }
}

interface IProps {
    tableData: ITableData
}

class Table extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        const firstHeader = this.props.tableData.dataFormat.find(df => df.header)
        const initialSortBy = firstHeader ? firstHeader.variable : ''
        const firstNumber = this.props.tableData.dataFormat.find(df => df.filterType === FilterType.number)
        const intitialNumberFilterBy = firstNumber ? firstNumber.variable : ''
        const firstDate = this.props.tableData.dataFormat.find(df => df.filterType === FilterType.date)
        const intitialDataFilterBy = firstDate ? firstDate.variable : ''
        this.state = {
            sortBy: initialSortBy,
            sortAscending: true,
            filter: {
                textFilterBy: initialSortBy,
                textFilter: '',
                numberFilterBy: intitialNumberFilterBy,
                numberFilterType: ComparatorType.gt,
                numberFilter: 0,
                dateFilterBy: intitialDataFilterBy,
                dateFilterType: ComparatorType.lt,
                dateFilter: new Date(1900, 0, 1),
                checkboxSets: []
            }
        }
    }

    tableCss = css`
        width: 1000px;
    `


    componentDidUpdate() {
        //checkbox init
        // if (this.state.filter.checkboxSets.length < 1 && this.props.tableData.dataFormat.find(df => df.filterType === FilterType.checkbox)) {

        //     let checkboxSets: any = []
        //     this.setState(prevState => ({
        //         filter: { ...prevState.filter, checkboxSets: checkboxSets }
        //     }))
        // }
    }

    setSort = (variable: string) => {
        if (variable === this.state.sortBy) {
            this.setState({ sortAscending: !this.state.sortAscending })
        } else {
            this.setState({ sortBy: variable, sortAscending: true })
        }
    }

    sort = (a: any, b: any) => {
        const s = a[this.state.sortBy].toString().localeCompare(b[this.state.sortBy].toString())
        return this.state.sortAscending ? s : -s
    }


    textFilter = (d: any) => d[this.state.filter.textFilterBy].toLowerCase().includes(this.state.filter.textFilter.toLowerCase())
    numberFilter = (d: any) => {
        let p
        switch (this.state.filter.numberFilterType) {
            case ComparatorType.gt:
                p = d[this.state.filter.numberFilterBy] > this.state.filter.numberFilter;
                break
            case ComparatorType.eq:
                p = d[this.state.filter.numberFilterBy] === this.state.filter.numberFilter;
                break
            case ComparatorType.lt:
                p = d[this.state.filter.numberFilterBy] < this.state.filter.numberFilter;
                break
            default:
                p = true
        }
        return p
    }
    dateFilter = (d: any) => {
        let p
        const date = d[this.state.filter.dateFilterBy]
        const compDate = new Date(date.getYear(), date.getMonth(), date.getDate())
        if (compDate instanceof Date && !isNaN(Number(compDate))) return true
        switch (this.state.filter.dateFilterType) {
            case ComparatorType.gt:
                p = compDate > this.state.filter.dateFilter;
                break
            case ComparatorType.eq:
                p = compDate === this.state.filter.dateFilter;
                break
            case ComparatorType.lt:
                p = compDate < this.state.filter.dateFilter;
                break
            default:
                p = true
        }

        return p
    }




    //TEXTFILTERS
    textFilterChangedHandler = (event: any) => {
        const v = event.target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, textFilter: v } }))
    }
    textFilterByChangedHandler = (event: any) => {
        const v = event.target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, textFilterBy: v } }))
    }

    //NUMBERFILTERS
    numberFilterChangedHandler = (event: any) => {
        const v = Number(event.target.value)
        this.setState(prevState => ({ filter: { ...prevState.filter, numberFilter: v } }))
    }
    numberFilterByChangedHandler = (event: any) => {
        const v = event.target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, numberFilterBy: v } }))
    }
    numberFilterTypeChangedHandler = (event: any) => {
        const v = Number(event.target.value)
        this.setState(prevState => ({ filter: { ...prevState.filter, numberFilterType: v } }))
    }

    //DATEFILTERS
    dateFilterChangedHandler = (event: any) => {
        const v =  event.target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, dateFilter: v } }))
    }
    dateFilterByChangedHandler = (event: any) => {
        const v = event.target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, dateFilterBy: v } }))
    }
    dateFilterTypeChangedHandler = (event: any) => {
        const v = Number(event.target.value)
        this.setState(prevState => ({ filter: { ...prevState.filter, dateFilterType: v } }))
    }


    render() {
        let k = 0
        const rows = this.props.tableData.data
            .filter(this.textFilter)
            .filter(this.numberFilter)
            .filter(this.dateFilter)
            .sort(this.sort)
            .map(td =>
                <Row key={k++} data={td} dataFormat={this.props.tableData.dataFormat} />
            )
        return (
            <div>

                <TextFilter
                    dataformat={this.props.tableData.dataFormat.filter(df => df.filterType === FilterType.searchString)}
                    filterChangedHandler={this.textFilterChangedHandler}
                    filterByChangedHandler={this.textFilterByChangedHandler}
                    filter={this.state.filter.textFilter}
                    filterBy={this.state.filter.textFilterBy}
                />
                <br />
                <NumberFilter
                    dataformat={this.props.tableData.dataFormat.filter(df => df.filterType === FilterType.number)}
                    filterChangedHandler={this.numberFilterChangedHandler}
                    filterByChangedHandler={this.numberFilterByChangedHandler}
                    filterTypeChangedHandler={this.numberFilterTypeChangedHandler}
                    filter={this.state.filter.numberFilter}
                    filterBy={this.state.filter.numberFilterBy}
                    filterType={this.state.filter.numberFilterType}
                />
                <br />
                <DateFilter
                    dataformat={this.props.tableData.dataFormat.filter(df => df.filterType === FilterType.date)}
                    filterChangedHandler={this.dateFilterChangedHandler}
                    filterByChangedHandler={this.dateFilterByChangedHandler}
                    filterTypeChangedHandler={this.dateFilterTypeChangedHandler}
                    filter={this.state.filter.dateFilter}
                    filterBy={this.state.filter.dateFilterBy}
                    filterType={this.state.filter.dateFilterType}
                />
                <br />
                <div css={this.tableCss}>
                    <Header dataFormat={this.props.tableData.dataFormat} callback={this.setSort} />
                    {rows}
                </div>
            </div>
        )
    }
}

export default Table