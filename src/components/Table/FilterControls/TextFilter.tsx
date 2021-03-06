import React from 'react'
import { ITableDataFormat } from '../Table'

interface IProps {
    dataformat: ITableDataFormat[]
    filterChangedHandler: (e: any) => void
    filterByChangedHandler: (e: any) => void
    filter: string
    filterBy: string
}

const textFilter: React.FC<IProps> = props => {
    const filterOptions = props.dataformat.map(df =>
        <option key={df.variable} value={df.variable}>{df.name}</option>
    )
    return <div>
        <select
            value={props.filterBy}
            onChange={props.filterByChangedHandler}
        >
            {filterOptions}
        </select>
        <input
            type='text'
            value={props.filter}
            onChange={props.filterChangedHandler}
            placeholder={'Search for a ' + props.filterBy} />
    </div>
}

export default textFilter
