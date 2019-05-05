/** @jsx jsx */ import { jsx, css } from '@emotion/core'
import React from 'react'
// import { css } from '@emotion/core'
import DataLoader from '../../components/DataLoader/DataLoader'
import Table, { ITableData, FilterType } from '../../components/Table/Table'

interface IState {
    persons: any[]
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

    containerCss = css`
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
    
    `

    getData = (persons: any[]) => {
        this.setState({ persons: persons })
    }

    render() {
        const tableData: ITableData = {
            data: this.state.persons,
            dataFormat: [
                { variable: 'name', name: 'Name', header: true, weight: 1, filterType: FilterType.searchString },
                { variable: 'age', name: 'Age', header: true, weight: 1, filterType: FilterType.number },
                { variable: 'company', name: 'Company', header: true, weight: 1, filterType: FilterType.searchString },
                { variable: 'email', name: 'Email', header: false, weight: 1, filterType: FilterType.searchString },
                { variable: 'registered', name: 'Signed up', header: false, weight: 1, filterType: FilterType.date, earliestDate: new Date('01-01-2010') },
                { variable: 'favoriteFruit', name: 'Favorite fruit', header: false, weight: 1, filterType: FilterType.checkbox },
                { variable: 'eyeColor', name: 'Eye Color', header: false, weight: 1, filterType: FilterType.checkbox },
                { variable: 'about', name: 'About', header: false, weight: 1, filterType: FilterType.searchString },
                { variable: 'id', name: 'Id', header: false, weight: 1, filterType: FilterType.searchString }
            ]
        }
        return (
            <React.Fragment>
                <DataLoader callback={this.getData} />
                <div css={this.containerCss}>
                    <Table tableData={tableData} />
                </div>
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