import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ITableDataFormat, ComparatorType } from '../Table'

interface IProps {
    dataformat: ITableDataFormat[]
    filterChangedHandler: (e: any) => void
    filterByChangedHandler: (e: any) => void
    filterTypeChangedHandler: (e: any) => void
    filter: Date | null
    filterBy: string
    filterType: ComparatorType
}

const dateFilter: React.FC<IProps> = props => {
    const numberFilterOptions = props.dataformat.map(df =>
        <option key={df.variable} value={df.variable}>{df.name}</option>
    )
    return <div>
        <select value={props.filterBy} onChange={props.filterByChangedHandler} >{numberFilterOptions}</select>
        <select value={props.filterType} onChange={props.filterTypeChangedHandler} >
            <option value={ComparatorType.gt}>Before</option>
            <option value={ComparatorType.eq}>On</option>
            <option value={ComparatorType.lt}>After</option>
        </select>
        <DatePicker 
            selected={props.filter} 
            onChange={props.filterChangedHandler} 
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            isClearable
            placeholderText="Click to enter a date"
        />
    </div>
}

export default dateFilter