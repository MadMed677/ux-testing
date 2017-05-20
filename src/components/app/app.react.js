import React, { Component } from 'react';

export default class App extends Component {
    state: {
        testName: string
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

    async onTestNameSave() {
        // console.log('save', this.state.testName);
        const response = await fetch('http://localhost:3333/');
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
                            <button className="btn btn-default" onClick={ () => this.onTestNameSave() }>Save</button>
                        </div>
                    </div>
                </section>
                <footer className="footer"></footer>
            </div>
        );
    }
};
