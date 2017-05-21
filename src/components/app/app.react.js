import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import StepperContainer from '../stepper/stepper.react';

injectTapEventPlugin();

export default class App extends Component {
    state: {
        testName: string,
        parameters: Array<{ name: string, value: string }>
    } = {
        parameters: []
    }

    /**
     * On parameter value changed
     *
     * @param {object} parameter - parameter information
     *
     * @return {void}
     * @private
     */
    _onParameterValueChanged = (parameter: { name: string, value: string }) => {
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
     * @param {string} testName - название теста
     *
     * @return {Promise.<*>}
     */
    async onTestNameSave(testName: string): Promise<*> {
        const request = { testName };
        console.log('testName: ', testName);

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

    }

    render() {
        console.log(this.state.parameters);

        return (
            <div className="container">
                <section className="section">
                    <h1>UX Testing</h1>

                    <hr/>

                    <StepperContainer
                        onTestNameSaved={ this.onTestNameSave.bind(this) }
                        parameters={ this.state.parameters }
                        onParameterValueChanged={ this._onParameterValueChanged }
                    />
                </section>
            </div>
        );
    }
};
