import React, { Component } from 'react';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

export default class StepperContainer extends Component {
    state: {
        testName: string,
        stepIndex: number,
        finished: boolean,
        startDate: string,
        endDate: string
    } = {
        stepIndex: 0,
        finished: false
    };

    props: {
        onTestNameSaved: () => mixed,
        parameters: Array<{ name: string, value: string }>
    } = {
        parameters: []
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

    _onDateChanged = (e: Event, date: string, field: 'start' | 'end') => {
        console.log('date: ', date);
        if ( field === 'start' ) {
            this.setState({ startDate: date });
        } else {
            this.setState({ endDate: date });
        }
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

    /**
     * Test name saved
     *
     * @return {void}
     */
    onTestNameSave = (): void => {
        this.props.onTestNameSaved(this.state.testName);
        this.handleNext();
    }

    render() {
        const $parameters = this.props.parameters.map(parameter =>
            <TableRow key={`table-row-${parameter.name}`}>
                <TableRowColumn style={{ textAlign: 'right' }}>{ parameter.name }</TableRowColumn>
                <TableRowColumn>
                    <TextField hintText="some hint" onChange={ (e) => this.props.onParameterValueChanged({ name: parameter.name, value: e.target.value }) } />
                </TableRowColumn>
            </TableRow>
        );

        return (
            <Stepper activeStep={ this.state.stepIndex } orientation="vertical">
                <Step>
                    <StepLabel>Write test name</StepLabel>
                    <StepContent>
                        <div className="row">
                            <div className="col-sm-6" style={{ textAlign: 'right' }}>
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
                    <StepLabel>Add test argument values</StepLabel>
                    <StepContent>
                        <Table selectable={ false }>
                            <TableHeader displaySelectAll={ false } enableSelectAll={ false }>
                                <TableRow>
                                    <TableHeaderColumn style={{ textAlign: 'right' }}>Test argument value</TableHeaderColumn>
                                    <TableHeaderColumn>Value</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody selectable={ false } displayRowCheckbox={ false } stripedRows={ false }>
                                { $parameters }
                                <TableRow>
                                    <TableHeaderColumn colSpan="2" style={{ textAlign: 'center' }}>
                                        Addition values
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn style={{ textAlign: 'right' }}>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Value</TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Start date</TableRowColumn>
                                    <TableRowColumn>
                                        <DatePicker
                                            hintText="Select start date"
                                            autoOk={ true }
                                            defaultDate={ this.state.startDate }
                                            maxDate={ this.state.endDate }
                                            formatDate={ new Intl.DateTimeFormat('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }).format}
                                            mode="landscape"
                                            onChange={ (e, date) => this._onDateChanged(e, date, 'start') }
                                        />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>End date</TableRowColumn>
                                    <TableRowColumn>
                                        <DatePicker
                                            hintText="Select end date"
                                            autoOk={ true }
                                            defaultDate={ this.state.endDate }
                                            minDate={ this.state.startDate }
                                            formatDate={ new Intl.DateTimeFormat('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }).format}
                                            mode="landscape"
                                            onChange={ (e, date) => this._onDateChanged(e, date, 'end') }
                                        />
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>

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
