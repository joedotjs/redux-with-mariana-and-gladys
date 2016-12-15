import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from './fake-redux';

const initialState = {
  firstColor: [0, 255, 0],
  secondColor: [255, 0, 0],
  thirdColor: [85, 100, 43]
};

const store = createStore((state = initialState, action) => {

  let newState;

  switch (action.type) {

    case 'SET_FIRST_COLOR':
      newState = Object.assign({}, state);
      newState.firstColor = action.color;
      break;

    default:
      return state;

  }

  newState.firstColor = newState.firstColor.slice(0);
  newState.secondColor = newState.secondColor.slice(0);
  newState.thirdColor = newState.thirdColor.slice(0);

  return newState;

});

const setFirstColor = color => {
    return {
      type: 'SET_FIRST_COLOR',
      color
    };
};

const randomNewColor = () => {
    return [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    ];
};

class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {

    store.subscribe(() => {
      this.setState(store.getState());
    });

    setInterval(() => {
      const action = setFirstColor(randomNewColor());
      store.dispatch(action);
    }, 1000);

  }

  render() {

    return (
      <div>
        <Color colorArr={this.state.firstColor} />
        <Color colorArr={this.state.secondColor} />
        <Color colorArr={this.state.thirdColor} />
      </div>
    );

  }

}

class Color extends Component {

  componentDidMount() {
    console.log('Color mounted.');
  }

  render() {

    const styleObj = {
      background: `rgb(${this.props.colorArr.join(',')})`,
      width: 200,
      height: 200
    };

    return (
      <div style={styleObj}>
      </div>
    );

  }

}

render((
  <AppContainer />
), document.getElementById('app'));