import React, { Component } from 'react';

export default class App extends Component {
    state: {
        testName: string
    } = {}

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

    async onTestNameSave() {
        const request = {
            testName: this.state.testName
        };

        const response = await fetch('http://localhost:3334/', {
            method: 'POST',
            // mode: 'cors',
            // headers: new Headers({
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'POST',
            //     'Access-Control-Allow-Headers': 'Content-Type',
            //     'Content-Type': 'application/json'
            // }),
            body: JSON.stringify(request)
        });
        const json = await response.json();
        console.log('reponse: ', json);
    }
    
    render() {
        return (
            <div className="container">
                <div className="header"></div>
                <section className="section">
                    <h1>UX Testing</h1>

                    <hr/>

                    <div className="input-group">
                        <input className="form-control" placeholder="Input Test Name" onChange={ this.onChangeTestName } />
                        <div className="input-group-btn">
                            <button className="btn btn-default" onClick={ this.onTestNameSave.bind(this) }>Save</button>
                        </div>
                    </div>
                </section>
                <footer className="footer"></footer>
            </div>
        );
    }
};
