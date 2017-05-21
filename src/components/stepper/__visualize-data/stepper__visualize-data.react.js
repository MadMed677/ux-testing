import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export default class StepperVisualizeData extends Component {
    props: {
        testInformation: {}
    }

    render() {
        const args = this.props.testInformation.arguments;
        console.log('testInformaiton: ', this.props.testInformation);
        const $arguments = args.map(argument => {
            const $names = argument.names.map(name =>
                <div className="row" key={`argument-name-${name.key}`}>
                    <div className="col-sm-4">{ name.key }</div>
                    <div className="col-sm-8">{ name.value }</div>
                </div>
            );



            return (
                <div className="row" key={`argument-${argument.hash}`}>
                    <div className="col-sm-6">{ $names }</div>
                    <div className="col-sm-6">

                    </div>
                </div>
            );
        });

        return (
            <Paper zDepth={ 2 }>
                { $arguments }
            </Paper>
        );
    }
}
