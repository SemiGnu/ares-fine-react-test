/** @jsx jsx */ import { jsx, css } from '@emotion/core'
import React from 'react'
// import { css } from '@emotion/core'
import DataLoader from '../../components/DataLoader/DataLoader'
import Table, { ITableData, FilterType } from '../../components/Table/Table'

interface IState {
    persons: any[]
    cities: any []
    displayData: string,
}

interface IProps {

}

class Layout extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {
            persons: [],
            cities: [],
            displayData: ''
        }
    }

    containerCss = css`
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
    
    `

    getData = (persons: any[], cities: any []) => {
        this.setState({ persons: persons, cities: cities })
    }

    render() {
        const persons: ITableData = {
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
        const cities: ITableData = {
            data: this.state.cities,
            dataFormat: [
                {variable: 'name', name: 'City', header: true, weight: 1, filterType: FilterType.searchString},
                {variable: 'state', name: 'State', header: true, weight: 1, filterType: FilterType.searchString},
                {variable: 'about', name: 'About', header: false, weight: 1, filterType: FilterType.searchString},
                {variable: 'government', name: 'Government', header: true, weight: 1, filterType: FilterType.checkbox},
                {variable: 'latitude', name: 'Latitude', header: false, weight: 1, filterType: FilterType.number},
                {variable: 'longitude', name: 'Longitude', header: false, weight: 1, filterType: FilterType.number},
                {variable: 'founded', name: 'Founded', header: false, weight: 1, filterType: FilterType.date, earliestDate: new Date('01-01-1800')},
                {variable: 'id', name: 'Id', header: false, weight: 1, filterType: FilterType.searchString},
            ]
        }
        let table
        switch(this.state.displayData) {
            case 'persons': 
            table = <Table key='persons' tableData={persons} />
            break
            case 'cities':
            table = <Table key='cities' tableData={cities} />
            break
            default:
            table= null 
        }
        return (
            <React.Fragment>
                <DataLoader callback={this.getData} />
                <div css={this.containerCss}>
                    <h2>Let's see some data!</h2>
                    <select value={this.state.displayData} onChange={(e) => this.setState({displayData:e.target.value})}>
                        <option value=''>--</option>
                        <option value='persons'>Persons</option>
                        <option value='cities'>Cities</option>
                    </select>
                    {table}
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