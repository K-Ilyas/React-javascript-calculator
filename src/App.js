import React, { Component } from 'react'
import Button from './component/Button';
import Formula from './component/Formula';
import Result from './component/Result';
import { NUMBERS_OPERATORS_DECIMAL_CLEAR } from './Data'
import './styles/style.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      result: '0',
      final: 0
    };

    this.handleClickNumbers = this.handleClickNumbers.bind(this);
    this.handleClearFormula = this.handleClearFormula.bind(this);
    this.handleClickResult = this.handleClickResult.bind(this);
    this.handleClickOperator = this.handleClickOperator.bind(this);
  }

  handleClickOperator = (character) => {
    if (this.state.final !== 0) {
      this.setState((prevState) => ({ result: character, formula: prevState.final + character, final: 0 }));
    }
    else {
      this.setState((prevState) => (
        {
          result: prevState.result.toString().concat(character)
            .replace(/(.+)([\\+-x\\/]){1}/, '$2')
            .replace(/([\\+-x\\/]){1}([\\+-x\\/]){1}/, '$2')

          ,
          formula: prevState.formula.toString().concat(character)
            .replace(/(-)([\\+x\\/]){1}/, '$2')
            .replace(/^([-]){2,}/, '$1')
            .replace(/([-]){2,}$/, '$1$1')
            .replace(/([\\+x\\/]){1}(-)+/, '$1$2')
            .replace(/([\\+x\\/]){1}([\\+x\\/]){1}/, '$2')
            .replace(/NAN=\sNAN/, '')
        }

      ));
    }
  }

  handleClickNumbers = (character) => {
    if (this.state.final !== 0) {
      this.setState((prevState) => ({ result: character, formula: character, final: 0 }));
    }
    else {
      if (this.state.result.length >= 22) {
        const data = this.state.result;
        this.setState({ result: 'MAX_DIGIT' });
        setTimeout(() => {
          this.setState({ result: data });
        }, 1000);
      }
      else if (this.state.result !== 'MAX_DIGIT') {
        this.setState((prevState) => (
          {
            result: prevState.result.toString().concat(character)
              .replace(/^(0)(\d)/, '$2')
              .replace(/([\\+x\\/])/, '')
              .replace(/^(0){2,}/, '0')
              .replace(/(\d)(\.){2,}/, '$1.')
              .replace(/(\d+)(\.)(\d+)(\.+)/, '$1$2$3')
              .replace(/NAN/, '')

            ,
            formula: prevState.formula.toString().concat(character)
              .replace(/^(0)(\d)/, '$2')
              .replace(/^(0){2,}/, '0')
              .replace(/(\d)(\.){2,}/, '$1.')
              .replace(/(\d+)(\.)(\d+)(\.+)/, '$1$2$3')
              .replace(/NAN=\sNAN/, '')
          }
        ));
      }
    }
  }
  // clear result and formula
  handleClearFormula = () => {
    this.setState({ formula: '', result: '0', final: 0 });
  }

  // final result
  handleClickResult = () => {
    const RESULT = this.state.formula.replace(/x/g, '*').replace(/--/g, ' - -').replace(/^([\\+\\*\\/]*)/, '').replace(/^-$/, '').replace(/(\d+)(\D*)$/, '$1').replace(/=(\s*)([0-9\\.]*)$/, '').replace(/NAN=\sNAN/, '');
    if (RESULT !== "") {
      // eslint-disable-next-line no-eval
      this.setState({ formula: RESULT + "= " + eval(RESULT), result: eval(RESULT).toString(), final: eval(RESULT) });
    }
    else {
      this.setState({ formula: "NAN= NAN", result: "NAN", final: 0 });
    }
  }

  render() {
    const BUTTONS = NUMBERS_OPERATORS_DECIMAL_CLEAR.map((e, index) => (
      <Button key={index} id={e.id} charcter={e.character} handleClick={e.id === 'add' || e.id === 'substract' || e.id === 'multiply' || e.id === 'divide' ? this.handleClickOperator : e.id === 'clear' ? this.handleClearFormula : e.id === 'equals' ? this.handleClickResult : this.handleClickNumbers} />
    ));
    return (
      <React.Fragment>
        <div id="container-fluid">
          <div id="calculator">
            <Formula formula={this.state.formula} />
            <Result result={this.state.result} />
            {
              BUTTONS
            }
          </div>
          <div id="author">
            <p>Designed and Coded by</p>
            <p>Ilyas Kritet.</p>
          </div>
        </div></React.Fragment>
    )
  }
}

export default App