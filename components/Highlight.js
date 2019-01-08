import React from 'react';
import Highlighter from 'react-highlight-words';

export default class Highlight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Highlighter
        autoEscape={true}
        className={this.props.className}
        textToHighlight={this.props.content}
        searchWords={[`${this.props.highlight}`]}
        highlightStyle={{
          backgroundColor: 'transparent',
          fontWeight: '700'
        }}
      />
    );
  }
}
