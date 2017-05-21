import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ParameterItem from '../parameter-item/parameter-item.react';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

injectTapEventPlugin();

export default class App extends Component {
    state: {
        testName: string,
        parameters: Array<{ name: string, value: string }>,
        stepIndex: number,
        finished: boolean
    } = {
        parameters: [],
        stepIndex: 0,
        finished: false
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

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    $stepActions = (step: number) => {
        const { stepIndex } = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                { step > 0 && <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />}
                { step > 0 && (
                    <RaisedButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
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

        this.handleNext();
        console.log(this.state.parameters);
    }
    
    render() {
        const $parameters = this.state.parameters.map(parameter =>
            <ParameterItem key={`parameter-item-${parameter.name}`} name={ parameter.name } onValueChanged={ this.onValueChanged } />
        );

        console.log('parameters: ', this.state.parameters);

        return (
            <div className="container">
                <section className="section">
                    <h1>UX Testing</h1>

                    <hr/>

                    <Stepper activeStep={ this.state.stepIndex } orientation="vertical">
                        <Step>
                            <StepLabel>Write test name</StepLabel>
                            <StepContent>
                                <div className="row">
                                    <div className="col-sm-6" style={{ 'text-align': 'right' }}>
                                        <TextField hintText="Input test name" onChange={ this.onChangeTestName } />
                                    </div>
                                    <div className="col-sm-6">
                                        <RaisedButton label="Save" onTouchTap={ this.onTestNameSave.bind(this) } />
                                    </div>
                                </div>

                                { this.$stepActions(0) }
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Select 2</StepLabel>
                            <StepContent>
                                <TextField hintText="Input test name" onChange={ this.onChangeTestName } />
                                <RaisedButton label="Save" onTouchTap={ this.onTestNameSave.bind(this) } />

                                { this.$stepActions(1) }
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Select 3</StepLabel>
                            <StepContent>
                                <TextField hintText="Input test name" onChange={ this.onChangeTestName } />
                                <RaisedButton label="Save" onTouchTap={ this.onTestNameSave.bind(this) } />

                                { this.$stepActions(2) }
                            </StepContent>
                        </Step>
                    </Stepper>

                    <div>
                        <hr/>

                        { $parameters }
                    </div>
                </section>
            </div>
        );
    }
};
