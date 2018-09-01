import React from 'react';
import ReactDOM from 'react-dom';
import DemoItem from './DemoItem';

export default class DemoSubArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      isWide: true
    };
    this.changeLayout = this.changeLayout.bind(this);
  }

  componentWillMount() {
    this.changeLayout();
    window.addEventListener('resize', this.changeLayout);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return ((this.state.isWide !== nextState.isWide) ||
  //       (this.props.routeParams.doc !== nextProps.routeParams.doc));
  // }

  changeLayout() {
    const width = document.body.clientWidth;
    const isWide = width > 800;
    this.setState({
      isWide
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeLayout);
  }

  render() {
    const props = this.props;
    const {pageData,childName} = props;
    const key = childName.children;
    const item =  pageData.demo[key];
    const content = props.utils.toReactComponent(['div'].concat(item.content));

    const demoComponent = (<DemoItem
        key={0}
        title={item.meta.title}
        content={content}
        code={props.utils.toReactComponent(item.highlightedCode)}
        isWide={this.state.isWide}
    >
      {/*{ this.state.isWide ? item.preview(React, ReactDOM) : null}*/}
      { this.state.isWide ?
          (setTimeout(()=>{ // 延迟能够找到 mountNode 对象
              window.mountNode = document.querySelector('.code-preview');
              if(!window.mountNode)return;
              window.React = require('rax');
              item.preview(); // run md 的 code 的关键命令
          },500))&&console.log('delay mountNode!')
          : null}
    </DemoItem>);
    const pageContent = pageData.index.content;
    const pageAPI = pageData.index.api;
    const title = pageData.index.meta.title;
    return <div>
      <h1>{title}</h1>
      {/*<div className="page-content">*/}
        {/*{props.utils.toReactComponent(pageContent)}*/}
      {/*</div>*/}
      <div className="demo-wrapper">
        {demoComponent}
      </div>
      {/*<div className="page-api">*/}
        {/*{props.utils.toReactComponent(pageAPI)}*/}
      {/*</div>*/}
    </div>;
  }
}
