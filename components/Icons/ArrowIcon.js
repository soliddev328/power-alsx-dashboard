import React from 'react';

export default class ArrowIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.723 8.203l-6.136 6.478c-.359.424-1.049.415-1.45.033-.404-.382-.436-1.06-.031-1.44l4.496-4.751H1.022a1.023 1.023 0 0 1 0-2.046h10.58L7.106 1.726c-.405-.38-.373-1.06.03-1.443.402-.382 1.102-.385 1.45.036l6.137 6.478c.186.198.274.43.277.703-.01.244-.11.526-.277.703z" />
        <style jsx>{`
          svg {
            margin: 0 1rem;
          }
        `}</style>
      </svg>
    );
  }
}
