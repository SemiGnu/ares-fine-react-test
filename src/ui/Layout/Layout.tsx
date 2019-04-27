import React from 'react'
// import { css } from '@emotion/core'
import DataLoader, { IPerson } from '../../components/DataLoader/DataLoader'
import Table, {ITableData} from '../../components/Table/Table'

interface IState {
    persons: IPerson[]
}

interface IProps {

}

class Layout extends React.Component<IProps, IState> { 
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {
            persons: []
        }
    }

    getData = (persons: IPerson[]) => {
            this.setState({persons: persons})
    }

    render() {
        const tableData: ITableData = {
            data: this.state.persons,
            headers: [
                {name: 'Name', value: 'name.last', weight: 1},
                {name: 'Age', value: 'age', weight: 1},
                {name: 'Company', value: 'company', weight: 1},
            ]
        }
        return (
            <React.Fragment>
                <DataLoader callback={this.getData}/>
                <Table tableData={tableData}/>
            </React.Fragment>
        )
    }
}

export default Layout


/*

import React from 'react'
// import { css } from '@emotion/core'

interface IState {

}

interface IProps {

}

class Layout extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            null
        )
    }
}

export default Layout

*/