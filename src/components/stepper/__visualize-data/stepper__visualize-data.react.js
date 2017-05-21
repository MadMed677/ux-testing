import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';

export default class StepperVisualizeData extends Component {
    state: {
        isModalOpen: boolean,
        currentLog: string
    } = {
        isModalOpen: false
    }

    props: {
        testInformation: {}
    }

    static defaultProps = {
        testInformation: {}
    }

    /**
     * Open modal
     *
     * @param {event} e
     * @param {string} log - log uri
     *
     * @return {void}
     * @private
     */
    _openModal = (e: Event, log: string) => {
        e.preventDefault();

        this.setState({
            isModalOpen: true,
            currentLog: log
        });
    }

    handleOpen = () => {
        this.setState({isModalOpen: true});
    };

    handleClose = () => {
        this.setState({isModalOpen: false});
    };

    render() {
        const args = this.props.testInformation.arguments;
        console.log('testInformaiton: ', this.props.testInformation);

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        const $arguments = args.map(argument => {
            const $names = argument.names.map(name =>
                <TableRow key={`argument-name-${name.key}`}>
                    <TableRowColumn>
                        { name.key }
                    </TableRowColumn>
                    <TableRowColumn>
                        { name.value }
                    </TableRowColumn>
                </TableRow>
            );

            const $failfullVerdicts = argument.statuses.failed.map(verdict => {
                const $uri = verdict.logs_uri.map((log, index) =>
                    <a href={log} key={`fail-uri-${index}`} onClick={ (e) => this._openModal(e, log) }>[{ index }]</a>
                );

                return (
                    <TableRow key={`argument-name-${verdict.verdict}`}>
                        <TableRowColumn>
                            { verdict.verdict }
                        </TableRowColumn>
                        <TableRowColumn>
                            { $uri }
                        </TableRowColumn>
                    </TableRow>
                );
            });

            const $succeededVerdicts = argument.statuses.succeded.map(verdict => {
                const $uri = verdict.logs_uri.map((log, index) =>
                    <a href={log} key={`fail-uri-${index}`}>[{ index }]</a>
                );

                return (
                    <TableRow key={`argument-name-${verdict.verdict}`}>
                        <TableRowColumn>
                            { verdict.verdict }
                        </TableRowColumn>
                        <TableRowColumn>
                            { $uri }
                        </TableRowColumn>
                    </TableRow>
                );
            });

            return (
                <div className="row" key={`argument-${argument.hash}`}>
                    <div className="col-sm-6">
                        <Table selectable={ false }>
                            <TableHeader displaySelectAll={ false } enableSelectAll={ false }>
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Value</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody selectable={ false } displayRowCheckbox={ false } stripedRows={ false }>
                                { $names }
                            </TableBody>
                        </Table>
                    </div>
                    <div className="col-sm-6">
                        <Table selectable={ false }>
                            <TableHeader displaySelectAll={ false } enableSelectAll={ false }>
                                <TableRow>
                                    <TableHeaderColumn colSpan="2" style={{ textAlign: 'center' }}>
                                        Failed
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Verdict</TableHeaderColumn>
                                    <TableHeaderColumn>URI</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody selectable={ false } displayRowCheckbox={ false } stripedRows={ false }>
                                { $failfullVerdicts }
                            </TableBody>
                        </Table>
                        <Table selectable={ false }>
                            <TableHeader displaySelectAll={ false } enableSelectAll={ false }>
                                <TableRow>
                                    <TableHeaderColumn colSpan="2" style={{ textAlign: 'center' }}>
                                        Succeeded
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Verdict</TableHeaderColumn>
                                    <TableHeaderColumn>URI</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody selectable={ false } displayRowCheckbox={ false } stripedRows={ false }>
                                { $succeededVerdicts }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            );
        });

        return (
            <Paper zDepth={ 2 }>
                { $arguments }

                <Dialog
                    title={`Test ${this.props.testInformation.testName}`}
                    actions={actions}
                    modal={false}
                    open={this.state.isModalOpen}
                    onRequestClose={this.handleClose}
                    contentStyle={{ width: '80%', height: '50%' }}
                >
                    <iframe src={ this.state.currentLog } style={{ width: '100%' , height: '100%', border: 'none' }} />
                </Dialog>
            </Paper>
        );
    }
}
