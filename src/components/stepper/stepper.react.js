// @flow
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
import Toggle from 'material-ui/Toggle';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import map from 'lodash/map';

import CONFIG from '../../config';

import StepperTestName from './__test-name/stepper__test-name.react';
import StepperVisualizeData from './__visualize-data/stepper__visualize-data.react';

export default class StepperContainer extends Component {
    state: {
        testName: string,
        parameters: Array<{ name: string, value: string }>,
        stepIndex: number,
        finished: boolean,

        startDate: string,
        endDate: string,
        tagsFilter: string,
        isBrokenSession: boolean,
        isGroupLogs: boolean,
        isIncludeAtLeastOneResult: boolean,
        isIncludeResultWithError: boolean,
        hash: string,
        verdict: string,
        bugId: number | string,
        isFailed: boolean,
        isSucceeded: boolean,
        testInformation: {}
    } = {
        parameters: [],
        stepIndex: 0,
        finished: false
    };

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
     * @return {Promise.<*>}
     */
    async onTestNameSave(): Promise<*> {
        const testName = this.state.testName.replace(/\//g, '_');
        const response = await fetch(`${CONFIG.BASE_URL}/test/${testName}/arguments`, {
            mode: 'cors'
        });

        const parameters = await response.json();
        this.setState({
            parameters: parameters.map(item => ({ name: item, value: '' }))
        });

        this.handleNext();
    }

    /**
     * On data was changed
     *
     * @param {event} e - event
     * @param {string} date
     * @param {string} field - field name ('start' or 'end')
     *
     * @return {void}
     * @private
     */
    _onDateChanged = (e: Event, date: string, field: 'start' | 'end'): void => {
        if ( field === 'start' ) {
            this.setState({ startDate: date });
        } else {
            this.setState({ endDate: date });
        }
    }

    /**
     * On tag filter changed
     *
     * @param {event} e - event
     *
     * @return {void}
     * @private
     */
    _onTagFilterChanged = (e: Event): void => {
        this.setState({ tagsFilter: e.target.value });
    }

    /**
     * On broken_session checked
     *
     * @param {event} e
     * @param {boolean} isChecked - is checkbox checked
     *
     * @return {void}
     * @private
     */
    _onBrokenSessionChecked = (e: Event, isChecked: boolean): void => {
        this.setState({
            isBrokenSession: isChecked
        });
    }

    /**
     * On results filter checked
     *
     * @param {event} e
     * @param {boolean} isChecked
     * @param {string} field
     *
     * @return {void}
     * @private
     */
    _onResultsFilterChecked = (e: Event, isChecked: boolean, field: 'include_at_least_one_result' | 'include_result_with_error'): void => {
        if ( field === 'include_at_least_one_result' ) {
            this.setState({ isIncludeAtLeastOneResult: isChecked });
        } else {
            this.setState({ isIncludeResultWithError: isChecked });
        }
    }

    /**
     * On group logs checked
     *
     * @param {event} e
     * @param {boolean} isChecked
     *
     * @return {void}
     * @private
     */
    _onGroupLogsChecked = (e: Event, isChecked: boolean): void => {
        this.setState({ isGroupLogs: isChecked });
    }

    /**
     * On hash changed
     *
     * @param {event} e
     *
     * @return {void}
     * @private
     */
    _onHashChanged = (e: Event): void => {
        this.setState({ hash: e.target.value });
    }

    /**
     * On verdict changed
     *
     * @param {event} e
     *
     * @return {void}
     * @private
     */
    _onVerdictChanged = (e: Event): void => {
        this.setState({ verdict: e.target.value });
    }

    /**
     * On bug id changed
     *
     * @param {event} e
     *
     * @return {void}
     * @private
     */
    _onBugIdChanged = (e: Event): void => {
        this.setState({ bugId: parseInt(e.target.value) });
    }

    /**
     * Show failed test
     *
     * @param {event} e
     * @param {boolean} isChecked
     *
     * @return {void}
     * @private
     */
    _onShowFailedTestChanged = (e: Event, isChecked: boolean): void => {
        this.setState({ isFailed: isChecked });
    }

    /**
     * Show failed test
     *
     * @param {event} e
     * @param {boolean} isChecked
     *
     * @return {void}
     * @private
     */
    _onShowSucceededTestChanged = (e: Event, isChecked: boolean): void => {
        this.setState({ isSucceeded: isChecked });
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

    async _saveAdditionData() {
        const queryData = {
            start_date: this.state.startDate && this.state.startDate.getTime(),
            end_date: this.state.endDate && this.state.endDate.getTime(),
            tags_filters: this.state.tagsFilter,
            parameters: JSON.stringify(this.state.parameters),
            broken_session: this.state.isBrokenSession,
            group_logs: this.state.isGroupLogs,
            include_at_least_one_result: this.state.isIncludeAtLeastOneResult,
            include_result_with_error: this.state.isIncludeResultWithError,
            hash: this.state.hash,
            verdict: this.state.verdict,
            bug_id: this.state.bugId,
            failed: this.state.isFailed,
            succeeded: this.state.isSucceeded
        };

        const queryString = map(queryData, (value, key) => {
            if ( typeof value === 'undefined' ) {
                return;
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        })
            .filter(item => typeof item !== 'undefined')
            .join('&');

        const response = await fetch(`${CONFIG.BASE_URL}/test/${this.state.testName}`, {
            mode: 'cors'
        });
        const data = await response.json();

        this.setState({ testInformation: data });

        this.handleNext();
    }

    render() {
        const $parameters = this.state.parameters.map(parameter =>
            <TableRow key={`table-row-${parameter.name}`}>
                <TableRowColumn style={{ textAlign: 'right' }}>{ parameter.name }</TableRowColumn>
                <TableRowColumn>
                    <TextField hintText="some hint" onChange={ (e) => this._onParameterValueChanged({ name: parameter.name, value: e.target.value }) } />
                </TableRowColumn>
            </TableRow>
        );

        return (
            <Stepper activeStep={ this.state.stepIndex } orientation="vertical">
                <Step>
                    <StepLabel>Write test name</StepLabel>
                    <StepContent>
                        <StepperTestName
                            onChangeTestName={ this.onChangeTestName }
                            onTestNameSave={ this.onTestNameSave.bind(this) }
                        />
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
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Tags filter</TableRowColumn>
                                    <TableRowColumn>
                                        <TextField hintText="tag1=value1,tag2=value2" onChange={ this._onTagFilterChanged } />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Broken sessions</TableRowColumn>
                                    <TableRowColumn>
                                        <Toggle
                                            label="Include"
                                            labelPosition="right"
                                            onToggle={ this._onBrokenSessionChecked }
                                        />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Logs grouping</TableRowColumn>
                                    <TableRowColumn>
                                        <Toggle
                                            label="Group logs by tags"
                                            labelPosition="right"
                                            onToggle={ this._onGroupLogsChecked }
                                        />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Results filter</TableRowColumn>
                                    <TableRowColumn>
                                        <Toggle
                                            label="Include only iterations having at least one result with error (such as unexpected result)"
                                            labelPosition="right"
                                            onToggle={ (e, isChecked) => this._onResultsFilterChecked(e, isChecked, 'include_at_least_one_result') }
                                        />
                                        <Toggle
                                            label="Include only results with error (such as unexpected result)"
                                            labelPosition="right"
                                            onToggle={ (e, isChecked) => this._onResultsFilterChecked(e, isChecked, 'include_result_with_error') }
                                        />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Hash</TableRowColumn>
                                    <TableRowColumn>
                                        <TextField hintText="Hash" onChange={ this._onHashChanged } />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Verdict</TableRowColumn>
                                    <TableRowColumn>
                                        <TextField hintText="verdict1,verdict2" onChange={ this._onVerdictChanged } />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Bug Id</TableRowColumn>
                                    <TableRowColumn>
                                        <TextField hintText="Bug id" onChange={ this._onBugIdChanged } />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Show failed test</TableRowColumn>
                                    <TableRowColumn>
                                        <Toggle
                                            onToggle={ this._onShowFailedTestChanged }
                                            labelPosition="right"
                                            thumbStyle={{ backgroundColor: '#fcc' }}
                                            trackStyle={{ backgroundColor: '#ff9d9d' }}
                                            thumbSwitchedStyle={{ backgroundColor: '#f00' }}
                                            trackSwitchedStyle={{ backgroundColor: '#ff9d9d' }}
                                        />
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{ textAlign: 'right' }}>Show succeeded test</TableRowColumn>
                                    <TableRowColumn>
                                        <Toggle
                                            labelPosition="right"
                                            onToggle={ this._onShowSucceededTestChanged }
                                        />
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <RaisedButton
                            label="Save"
                            disableTouchRipple={ true }
                            disableFocusRipple={ true }
                            primary={ true }
                            onTouchTap={ this._saveAdditionData.bind(this) }
                            style={{ marginRight: 12 }}
                        />
                        <RaisedButton
                            label="Back"
                            disableTouchRipple={ true }
                            disableFocusRipple={ true }
                            onTouchTap={ this.handlePrev }
                        />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Visualize data</StepLabel>
                    <StepContent>
                        <StepperVisualizeData testInformation={ this.state.testInformation } />
                    </StepContent>
                </Step>
            </Stepper>
        );
    }
}
