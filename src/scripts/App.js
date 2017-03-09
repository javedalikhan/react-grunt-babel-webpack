import React, { Component } from 'react';
class TextBox extends Component {
    render() {
        return (
            <div>
                <input type="text" value={this.props.text} onChange={this.props.handleChange} name="text"/>
                <br/>
                <br/>
            </div>
        );
    }
}
class RadioButton extends Component {
    render() {
        return (
            <div>
                <input type="radio" value={this.props.uppercase} onChange={this.props.handleChange} name="transform"/>{this.props.uppercase}
                <input type="radio" value={this.props.lowercase} onChange={this.props.handleChange} name="transform"/>{this.props.lowercase}
            </div>
        );
    }
}
class DropDown extends Component {
    render() {
        let options = [];
        this.props.colors.forEach((color) => {
            options.push(<option value={color.key}>{color.value}</option>)
        });
        return (
            <select name="color" value={this.props.default} onChange={this.props.handleChange}>
                <option selected value={this.props.default}>{this.props.default}</option>
                {options}
            </select>
        );
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        const color = 'white';
        this.state = {
            transform: 'none',
            text: this.props.text,
            file: 'header.html',
            para: {
                one: 'To get started, edit',
                two: 'and see the Header update'
            },
            uppercase: 'uppercase',
            lowercase: 'lowercase',
            color,
            colors: [
                {
                    key: 'red',
                    value: 'Red'
                },
                {
                    key: 'green',
                    value: 'Green'
                }
            ]
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
                        textTransform: this.state.transform,
                        color: this.state.color
                    }}>{this.state.text}</h2>
                </div>
                <p className="App-intro">
                    {this.state.para.one} <code>{this.state.file}</code> {this.state.para.two}.
                </p>
                <TextBox text={this.state.text} handleChange={this.handleChange}/>
                <RadioButton uppercase={this.state.uppercase} lowercase={this.state.lowercase} handleChange={this.handleChange}/>
                <br/>
                <DropDown colors={this.state.colors} default={this.state.color} handleChange={this.handleChange}/>
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
