import React from 'react'
// import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ITableDataFormat, ComparatorType } from '../Table'

interface IProps {
    dataformat: ITableDataFormat[]
    filterChangedHandler: (e: any) => void
    filterByChangedHandler: (e: any) => void
    filterTypeChangedHandler: (e: any) => void
    filter: Date
    filterBy: string
    filterType: ComparatorType
}

const formatDate = (date: Date) => {
    date = new Date(date)
    let text = date.getFullYear().toString() + '-'
    if (date.getMonth() < 9) text += '0'
    text += (1 + date.getMonth()) + '-'
    if (date.getDate() < 10) text += '0'
    text += date.getDate()
    return text
}

const dateFilter: React.FC<IProps> = props => {
    const numberFilterOptions = props.dataformat.map(df =>
        <option key={df.variable} value={df.variable}>{df.name}</option>
    )
    return <React.Fragment>
        <select value={props.filterBy} onChange={props.filterByChangedHandler} >{numberFilterOptions}</select>
        <select value={props.filterType} onChange={props.filterTypeChangedHandler} >
            <option value={ComparatorType.gt}>Before</option>
            <option value={ComparatorType.eq}>On</option>
            <option value={ComparatorType.lt}>After</option>
        </select>
        <input type='date' value={formatDate(props.filter)} onChange={props.filterChangedHandler} />
        {/* <DatePicker selected={props.filter} onChange={props.filterChangedHandler}/> */}
    </React.Fragment>
}

export default dateFilter