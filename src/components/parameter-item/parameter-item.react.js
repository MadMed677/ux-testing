import React, { Component } from 'react';

export default class ParameterItem extends Component {
    props: {
        name: string,
        onValueChanged: () => { name: string, value: string }
    }

    onSetValue = (e: Event) => {
        const value = e.target.value;

        this.props.onValueChanged({ name: this.props.name, value });
    }

    render() {
        const { name } = this.props;

        return (
            <div className="input-group">
                <input className="form-control" onChange={ this.onSetValue } />
                <span className="input-group-addon">{ name }</span>
            </div>
        );
    }
}
