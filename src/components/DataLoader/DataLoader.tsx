import React from 'react'
import axios from 'axios'

interface IState {
    persons: any[]
}

interface IProps {
    callback: ((data: any[]) => void)
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
            const persons: any[] = response.data.map(((p: any) => {
                const person: any = {
                    id: p._id,
                    about: p.about,
                    name: p.name.first + " " + p.name.last,
                    company: p.company,
                    age: p.age,
                    registered: new Date(p.registered),
                    email: p.email,
                    favoriteFruit: p.favoriteFruit,
                    eyeColor: p.eyeColor
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