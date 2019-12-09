import React, { Component } from 'react'
import './BuyerPages.css'
import Select from 'react-select'

export class BuyerFilterSearchPage extends Component {

    customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20,
        }),
        control: () => ({
            width: "auto",
            backgroundColor: "white",
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }

    }

    render() {

        const options = [
            { label: 'Italian', value: 'Italian' },
            { label: 'Indian', value: 'Indian' },
            { label: 'Chinese', value: 'Chinese' },
            { label: 'Thai', value: 'Thai'},
        ];

        return (
            <div>
                <h3 style= {{
                    display: "block",
                    fontSize: "18px",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    marginInlineStart: "0px",
                    marginInlineEnd: "0px",
                    fontWeight: "bold",
                    marinTop: "0",
                    marginBottom: "4px",
                    lineHeight: "1.37337",
                    fontFamily: "sans-bold",
                    boxSize: "inherit",
                }}> 
                    Filter by Cuisine
                </h3>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    // defaultValue={options[0]}
                    name="color"
                    options={options} 
                    onChange={this.props.onSelectingOption}/>
            </div>
        )
    }
}

export default BuyerFilterSearchPage
