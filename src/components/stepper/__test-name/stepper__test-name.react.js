import React, { Component } from 'react';

import {
    Step,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class StepperTestName extends Component {

    render() {
        return (
            <Step>
                <StepLabel>Write test name</StepLabel>
                <StepContent>
                    Hello
                </StepContent>
            </Step>
        );
    }
}
