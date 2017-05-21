import React, { Component } from 'react';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class StepperTestName extends Component {
    state: {
        testName: string
    }

    props: {
        onTestNameSave: () => mixed,
        $stepActions: (index: number) => mixed
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

    render() {
        return (
            <Step>
                <StepLabel>Write test name</StepLabel>
                <StepContent>
                    <div className="row">
                        <div className="col-sm-6" style={{ textAlign: 'right' }}>
                            <TextField hintText="Input test name" onChange={ this.onChangeTestName } />
                        </div>
                        <div className="col-sm-6">
                            <RaisedButton label="Save" onTouchTap={ this.props.onTestNameSave.bind(this) } />
                        </div>
                    </div>

                    { this.props.$stepActions(0) }
                </StepContent>
            </Step>
        );
    }
}
