# render-props
Build Status npm version Coverage Status

TL;DR

This package is for component authors.
It allows you to easily and reliably support Render Props, Component Injection, AND Function as a Child.
Get increased performance from your SFCs while respecting the component's defaultProps.
Install
$ npm i --save render-props
API
Simply import from render-props using ES6.

import renderProps from 'render-props';
This will import the renderProps function which takes two parameters.

renderProps(componentOrFunction, props)
componentOrFunction - The first parameter is whatever was passed to your component in this.props.render (or whatever you call your prop).

props - The second parameter is a props object. This will be spread to the function or component.

Usage
Let's say that you authored or are authoring a component that takes a render prop (Render Props) or a Component (Component Injection). There is some overhead required to support both.

This package will allow you to support both Render Props and Component Injection with zero effort.

What does this package offer over doing the work yourself?

If you support Component Injection, this package will check to see if the component is a Stateless Functional Component (SFC) and, if so, will call it directly for improved performance.

Another benefit is that Render Props can now have defaultProps. Because, let's face it, a render prop is really just the same as a SFC.

Let's take the following component. It takes a prop named render. By simply importing the render-props package, you can now accept a function, a SFC, or a class component. Almost like magic! 🎩

import renderProps from 'render-props';

class MyComponent extends Component {
  state = {};

  componentDidMount() {
    this.timer = setInterval(() => {
      const currentCount = this.state.count || 0;
      this.setState({ count: currentCount + 1 });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return renderProps(this.props.render, this.state);
  }
}
You can use any of the following and they will all render properly.

const RenderCountSFC = ({ count, foo }) => ( 
  `Count = ${count} foo=${foo}`
);
RenderCountSFC.defaultProps = {
  foo: 'foo',
  count: 0,
};

class RenderCount extends Component {
  render() {
    const { count, foo } = this.props;
    return (
      `Count = ${count} foo=${foo}`
    );
  }
}
RenderCount.defaultProps = {
  foo: 'foo',
  count: 0,
};

const App = () => (
  <div>
    <h2>Traditional Render Prop</h2>
    <MyComponent
      render={
        ({ count, foo }) => (`Count = ${count} foo=${foo}`)
      }
    />

    <h2>Component Injection (SFC)</h2>
    <MyComponent render={RenderCountSFC} />

    <h2>Using Component Injection (class)</h2>
    <MyComponent render={RenderCount} />
  </div>
);
This will work no matter what you pass in the render prop. You can pass a function, a Stateless Functional Component (SFC), or a class component. In any case, it will be called to do the rendering.

Plus, if you pass a SFC, it will be rendered by calling it directly. This is a huge performance boost over using JSX/React.createElement.

[Note: Starting with version 1.1.0, SFCs that specify propTypes will be rendered as Components in order to take advantage of prop validation.]

This helper will also merge in any defaultProps that your component might be using.

Support Function as a Child too!
If you would also like to support Function as a Child you can change the example code above like this.

render() {
  const { children, render = children } = this.props;
  return renderProps(render, this.state);
}
It's good to note that I appall this pattern but I've shown the example for completeness.

See it Live!
Here is a CodeSandbox with the sample component shown above running live.