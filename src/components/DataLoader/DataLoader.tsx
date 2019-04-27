import React from 'react'
import { css } from '@emotion/core'
import axios from 'axios'



export interface IPerson {
    id: string
    name: {
        first: string,
        last: string
    }
    company: string
    email: string
    about: string
    registered: Date
    age: number
    favoriteFruit: string
}

interface IState {
    persons: IPerson[]
}

interface IProps {
    callback: Function
}

class DataLoader extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {
            persons: []
        }
    }

    componentDidMount() {
        axios.get("https://ares-fine-react-test.firebaseio.com/persons.json").then((response) => {
            let persons: IPerson[] = response.data.map(((p: any) => {
                const person: IPerson = {
                    id: p._id,
                    about: p.about,
                    name: p.name,
                    company: p.company,
                    age: p.age,
                    registered: new Date(p.registered),
                    email: p.email,
                    favoriteFruit: p.favoriteFruit,
                }
                return person
            }))
            this.setState({ persons: persons })
            console.log("persons", persons)
        })
    }


    render() {
        return (
            null
        )
    }
}

export default DataLoader