import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

export default class StepperVisualizeData extends Component {
    props: {
        testInformation: {}
    }

    render() {
        const args = this.props.testInformation.arguments;
        console.log('testInformaiton: ', this.props.testInformation);
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
