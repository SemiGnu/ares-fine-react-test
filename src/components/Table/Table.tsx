/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import Header from './Header/Header'
import Row from './Row/Row'
import TextFilter from './FilterControls/TextFilter'
import NumberFilter from './FilterControls/NumberFilter'
import DateFilter from './FilterControls/DateFilter';
import CheckboxFilter from './FilterControls/CheckboxFilter';

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

export interface ICheckboxSet {
    name: string
    variable: string
    values: { value: string, checked: boolean }[]
}

export interface ITableDataFormat {
    variable: string
    name: string
    header: boolean
    weight: number
    filterType: FilterType
    defaultFilter?: any
    earliestDate?: Date
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
        dateFilter: Date | null
        checkboxSets: ICheckboxSet[]
    },
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
        const initialNumberFilterBy = firstNumber ? firstNumber.variable : ''
        const firstDate = this.props.tableData.dataFormat.find(df => df.filterType === FilterType.date)
        const initialDateFilterBy = firstDate ? firstDate.variable : ''
        this.state = {
            sortBy: initialSortBy,
            sortAscending: true,
            filter: {
                textFilterBy: initialSortBy,
                textFilter: '',
                numberFilterBy: initialNumberFilterBy,
                numberFilterType: ComparatorType.gt,
                numberFilter: 0,
                dateFilterBy: initialDateFilterBy,
                dateFilterType: ComparatorType.lt,
                dateFilter: null,
                checkboxSets: []
            },
        }
    }

    tableCss = css`
        width: 960px;
        color:  #222;
        @media (max-width: 1200px) {
            width: 80%;
        }

        select {
            border: 1px solid #bbd;
            border-radius: 5px;
            box-shadow: 0px 0px 2px #99c;
            background-color: white;
            margin : 5px;
            padding: 5px;
        }

        input {
            border: 1px solid #bbd;
            border-radius: 5px;
            box-shadow: 0px 0px 2px #99c;
            margin : 5px;
            padding: 6px;
        }

    `
        componentDidMount() {
            if (this.props.tableData.dataFormat.reduce((acc, df) => (acc || (df.filterType === FilterType.checkbox)), false) && this.state.filter.checkboxSets.length < 1) {
                const newFilter = { ...this.state.filter }
                newFilter.checkboxSets = this.props.tableData.dataFormat.filter(df => df.filterType === FilterType.checkbox).map(df => {
                    let vars: any[] = []
                    this.props.tableData.data.map(d => {
                        if (!vars.includes(d[df.variable])) {
                            vars.push(d[df.variable])
                        } return null
                    })
                    const vals = vars.map(v => ({ value: v, checked: false }))
                    const newSet = { name: df.name, variable: df.variable, values: vals }
                    return newSet
                })
                this.setState({ filter: newFilter })
            }
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


    textFilter = (d: any) => {
        if (this.props.tableData.dataFormat.reduce((acc, df) => acc && (df.filterType !== FilterType.searchString) , true)) return true
        return d[this.state.filter.textFilterBy].toLowerCase().includes(this.state.filter.textFilter.toLowerCase())
    }
    numberFilter = (d: any) => {
        if (this.props.tableData.dataFormat.reduce((acc, df) => acc && (df.filterType !== FilterType.number) , true)) return true
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
        if (this.props.tableData.dataFormat.reduce((acc, df) => acc && (df.filterType !== FilterType.date) , true)) return true
        let p
        const date = d[this.state.filter.dateFilterBy]
        const compDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        if (!(compDate instanceof Date && !isNaN(Number(compDate))) || !this.state.filter.dateFilter) return true
        switch (this.state.filter.dateFilterType) {
            case ComparatorType.gt:
                p = compDate < this.state.filter.dateFilter;
                break
            case ComparatorType.eq:
                p = compDate === this.state.filter.dateFilter;
                break
            case ComparatorType.lt:
                p = compDate > this.state.filter.dateFilter;
                break
            default:
                p = true
        }
        return p
    }
    checkboxFilter = (d: any) => {
        const subFilters = this.state.filter.checkboxSets.map(set => {
            if (!set.values.reduce((acc, curr) => (acc || curr.checked), false)) return true
            if (set.values.reduce((acc, curr) => (acc || (curr.value === d[set.variable] && curr.checked)), false)) return true
            return false
        })
        return subFilters.reduce((acc, curr) => acc && curr, true)
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
    dateFilterChangedHandler = (date: Date) => {
        const v = date
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

    //CHECKBOXFILTERS
    checkboxFilterChangedHandler = (index: number, checkboxSet: ICheckboxSet) => {
        const newSets = [...this.state.filter.checkboxSets]
        newSets[index] = checkboxSet
        this.setState(prevState => ({ filter: { ...prevState.filter, checkboxSets: newSets } }))
    }


    render() {
        let filters = []
        if (this.props.tableData.dataFormat.reduce((acc, df) => acc || df.filterType === FilterType.searchString, false)) filters.push(
            <TextFilter
                key='text'
                dataformat={this.props.tableData.dataFormat.filter(df => df.filterType === FilterType.searchString)}
                filterChangedHandler={this.textFilterChangedHandler}
                filterByChangedHandler={this.textFilterByChangedHandler}
                filter={this.state.filter.textFilter}
                filterBy={this.state.filter.textFilterBy}
            />
        )
        if (this.props.tableData.dataFormat.reduce((acc, df) => acc || df.filterType === FilterType.number, false)) filters.push(
            <NumberFilter
                key='number'
                dataformat={this.props.tableData.dataFormat.filter(df => df.filterType === FilterType.number)}
                filterChangedHandler={this.numberFilterChangedHandler}
                filterByChangedHandler={this.numberFilterByChangedHandler}
                filterTypeChangedHandler={this.numberFilterTypeChangedHandler}
                filter={this.state.filter.numberFilter}
                filterBy={this.state.filter.numberFilterBy}
                filterType={this.state.filter.numberFilterType}
            />
        )
        if (this.props.tableData.dataFormat.reduce((acc, df) => acc || df.filterType === FilterType.date, false)) filters.push(
            <DateFilter
                key='date'
                dataformat={this.props.tableData.dataFormat.filter(df => df.filterType === FilterType.date)}
                filterChangedHandler={this.dateFilterChangedHandler}
                filterByChangedHandler={this.dateFilterByChangedHandler}
                filterTypeChangedHandler={this.dateFilterTypeChangedHandler}
                filter={this.state.filter.dateFilter}
                filterBy={this.state.filter.dateFilterBy}
                filterType={this.state.filter.dateFilterType}
            />
        )
        filters = filters.concat(this.state.filter.checkboxSets.map((cf, index) => <CheckboxFilter key={index} checkboxSet={cf} checkboxChangedHandler={(checkboxSet: ICheckboxSet) => this.checkboxFilterChangedHandler(index, checkboxSet)} />))
        const rows = this.props.tableData.data
            .filter(this.textFilter)
            .filter(this.numberFilter)
            .filter(this.dateFilter)
            .filter(this.checkboxFilter)
            .sort(this.sort)
            .map((td, index) =>
                <Row key={index} shaded={index % 2 === 0} data={td} dataFormat={this.props.tableData.dataFormat} />
            )
        return (
            <React.Fragment>
                <div css={this.tableCss}>
                    {filters}
                </div>
                <div css={this.tableCss}>
                    <Header dataFormat={this.props.tableData.dataFormat} callback={this.setSort} sortBy={this.state.sortBy} ascending={this.state.sortAscending} />
                    {rows}
                </div>
            </React.Fragment>
        )
    }
}

export default Table