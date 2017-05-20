import React, { Component } from 'react';
import ParameterItem from '../parameter-item/parameter-item.react';

export default class App extends Component {
    state: {
        testName: string,
        parameters: Array<{ name: string, value: string }>
    } = {
        parameters: []
    }

    /**
     * On changed test name
     *
     * @param {Event} e - event
     *
     * @return {void}
     */
    onChangeTestName = (e: Event): void => {
        this.setState({
            testName: e.target.value
        });
    }

    onValueChanged = (parameter: { name: string, value: string }) => {
        this.setState({
            parameters: this.state.parameters.map(item => {
                if (item.name === parameter.name) {
                    return { name: parameter.name, value: parameter.value };
                }

                return item;
            })
        });
    }

    /**
     * Request parameters from API
     *
     * @return {Promise.<*>}
     */
    async onTestNameSave(): Promise<*> {
        const request = {
            testName: this.state.testName
        };

        const response = await fetch('http://localhost:3334/', {
            method: 'POST',
            // mode: 'cors',
            // headers: new Headers({
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'POST',
            //     'Access-Control-Allow-Headers': 'Content-Type',
            //     'Content-Type': 'application/json'
            // }),
            body: JSON.stringify(request)
        });

        const { parameters } = await response.json();
        this.setState({
            parameters: parameters.map(item => ({ name: item, value: '' }))
        });
        console.log(this.state.parameters);
    }
    
    render() {
        const $parameters = this.state.parameters.map(parameter =>
            <ParameterItem key={`parameter-item-${parameter.name}`} name={ parameter.name } onValueChanged={ this.onValueChanged } />
        );

        console.log('parameters: ', this.state.parameters);

        return (
            <div className="container">
                <div className="header"></div>
                <section className="section">
                    <h1>UX Testing</h1>

                    <hr/>

                    <div className="input-group">
                        <input className="form-control" placeholder="Input Test Name" onChange={ this.onChangeTestName } />
                        <div className="input-group-btn">
                            <button className="btn btn-default" onClick={ this.onTestNameSave.bind(this) }>Save</button>
                        </div>
                    </div>

                    <div>
                        <hr/>

                        { $parameters }
                    </div>
                </section>
                <footer className="footer"></footer>
            </div>
        );
    }
};
