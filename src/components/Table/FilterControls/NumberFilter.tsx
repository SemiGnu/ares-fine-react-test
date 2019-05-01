import React from 'react'
import { ITableDataFormat, ComparatorType } from '../Table'

interface IProps {
    dataformat: ITableDataFormat[]
    filterChangedHandler: (e: any) => void
    filterByChangedHandler: (e: any) => void
    filterTypeChangedHandler: (e: any) => void
    filter: number
    filterBy: string
    filterType: ComparatorType
}

const numberFilter: React.FC<IProps> = props => {
    const numberFilterOptions = props.dataformat.map(df =>
        <option key={df.variable} value={df.variable}>{df.name}</option>
    )
    return <React.Fragment>
        <select value={props.filterBy} onChange={props.filterByChangedHandler} >{numberFilterOptions}</select>
        <select value={props.filterType} onChange={props.filterTypeChangedHandler} >
            <option value={ComparatorType.gt}>></option>
            <option value={ComparatorType.eq}>=</option>
            <option value={ComparatorType.lt}>{'<'}</option>
        </select>
        <input type='number' value={props.filter} onChange={props.filterChangedHandler} />
    </React.Fragment>
}

export default numberFilter