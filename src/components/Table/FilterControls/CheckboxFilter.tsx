/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import React from 'react'
import { ICheckboxSet } from '../Table'

interface IProps {
    checkboxSet: ICheckboxSet
    checkboxChangedHandler: (checkboxSet: ICheckboxSet) => void
}

const cbCss = css`
    padding: 3px 5px;
    font-weight: 400;
    font-size: 14px;
    font-family: arial;
    border: 1px solid #bbd;
    border-radius: 5px;
    box-shadow: 0px 0px 2px #99c;
    margin: 5px 5px 10px 5px;
    width: auto;


    label {
        margin: 0 10px 0 0;
        input {
            transform: scale(1.2);
            opacity: 1;
            cursor: pointer;
          }
    }
`

const checkboxFilter: React.FC<IProps> = props => {

        let checkboxes = props.checkboxSet.values.map((v, index) => 
            <label key={index}>
                <CheckBox
                    checked={v.checked}
                    onChange={() => props.checkboxChangedHandler(newSet(props.checkboxSet,v.value))}
                />
                <span>{v.value}</span>
            </label>
        )
        
        return (
            <div css={cbCss}>
                <label>{props.checkboxSet.name}</label>
                {checkboxes}
            </div>
        )
}

const newSet = (oldSet: ICheckboxSet, toggle: string) => {
    const newSet: ICheckboxSet = {...oldSet}
    newSet.values = oldSet.values.map(v => {
        if (v.value === toggle) return {value: v.value, checked: !v.checked}
        return v
    })
    return newSet
}

interface ICheckBoxProps {
    checked: boolean
    onChange: () => void
}

const CheckBox: React.FC<ICheckBoxProps> = props => {
    return (
        <input type='checkbox' checked={props.checked} onChange={props.onChange} />
    )
}


export default checkboxFilter