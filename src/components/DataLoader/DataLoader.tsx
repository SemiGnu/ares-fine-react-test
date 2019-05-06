import React from 'react'
import axios from 'axios'

interface IState {
    persons: any[]
    cities: any[]
}

interface IProps {
    callback: ((persons: any[], cities: any []) => void)
}

class DataLoader extends React.Component<IProps, IState> {
    state: IState
    constructor(props: IProps) {
        super(props)
        this.state = {
            persons: [],
            cities: []
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
            this.setState({persons: persons})
        })
        axios.get("https://ares-fine-react-test.firebaseio.com/cities.json").then((response) => {
            const cities: any[] = response.data.map(((p: any) => {
                const city: any = {
                    id: p._id,
                    about: p.about,
                    name: p.name,
                    state: p.state,
                    founded: new Date(p.founded),
                    government: p.government,
                    latitude: p.latitude,
                    longitude: p.longitude
                }
                return city
            }))
            this.setState({cities: cities})
        })
    }

    shouldComponentUpdate() {
        return this.state.persons.length < 1 || this.state.cities.length < 1
    }

    componentDidUpdate() {
        if (this.state.persons.length > 0 && this.state.cities.length > 0) {
            this.props.callback(this.state.persons, this.state.cities)
        }
    }

    render() {
        return (
            null
        )
    }
}

export default DataLoader