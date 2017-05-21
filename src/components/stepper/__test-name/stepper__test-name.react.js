import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class StepperTestName extends Component {
    props: {
        onTestNameSave: () => mixed,
        onChangeTestName: () => mixed
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6" style={{ textAlign: 'right' }}>
                    <TextField hintText="Input test name" onChange={ this.props.onChangeTestName } />
                </div>
                <div className="col-sm-6">
                    <RaisedButton label="Save" onTouchTap={ this.props.onTestNameSave } />
                </div>
            </div>
        );
    }
}
