import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import StepperContainer from '../stepper/stepper.react';

injectTapEventPlugin();

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <section className="section">
                    <h1>UX Testing</h1>

                    <hr/>

                    <StepperContainer />
                </section>
            </div>
        );
    }
};
