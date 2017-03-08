import React, { Component } from 'react';
//import '../styles/lexus/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transform: 'none',
            text: this.props.text,
            prefix: '<h2>',
            suffix: '</h2>',
            file: 'header.html',
            para: {
                one: 'To get started, edit',
                two: 'and see the Header update'
            },
            uppercase: 'uppercase',
            lowercase: 'lowercase'
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        const target = e.target,
            name = target.name;
        this.setState({
            [name]: target.value
        });
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2 style={{
                        textTransform: this.state.transform
                    }}>{this.state.text}</h2>
                </div>
                <p className="App-intro">
                    {this.state.para.one} <code>{this.state.file}</code> {this.state.para.two}.
                </p>
                <div>
                    <input type="text" value={this.state.text} onChange={this.handleChange} name="text"/>
                    <br/>
                    <br/>
                </div>
                <div>
                    <input type="radio" value={this.state.uppercase} onChange={this.handleChange} name="transform"/>{this.state.uppercase}
                    <input type="radio" value={this.state.lowercase} onChange={this.handleChange} name="transform"/>{this.state.lowercase}
                </div>
            </div>
        );
    }
}
App.defaultProps = {
    text: 'Welcome to React'
};
App.propTypes = {
    text: React.PropTypes.string.isRequired
};
export default App;
