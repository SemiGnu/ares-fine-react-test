import React from 'react'
import axios from 'axios'



export interface IPerson {
    id: string
    name: string
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
    callback: ((persons: IPerson[]) => void)
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
            const persons: IPerson[] = response.data.map(((p: any) => {
                const person: IPerson = {
                    id: p._id,
                    about: p.about,
                    name: p.name.first + " " + p.name.last,
                    company: p.company,
                    age: p.age,
                    registered: new Date(p.registered),
                    email: p.email,
                    favoriteFruit: p.favoriteFruit,
                }
                return person
            }))
            this.setState({ persons: persons })
        })
    }

    shouldComponentUpdate() {
        return this.state.persons.length < 1
    }

    componentDidUpdate() {
        if (this.state.persons.length > 0) {
            this.props.callback(this.state.persons)
        }
    }

    render() {
        return (
            null
        )
    }
}

export default DataLoader