import React, { Component } from 'react';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class StepperContainer extends Component {
    state: {
        stepIndex: number,
        finished: boolean
    } = {
        stepIndex: 0,
        finished: false
    };

    props: {
        onTestNameSaved: () => mixed
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

    onTestNameSave = () => {
        this.props.onTestNameSaved();
        this.handleNext();
    }

    render() {
        return (
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
        );
    }
}
