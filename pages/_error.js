import React from 'react';

class error extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section>
        <h1>404</h1>
        <h3>Page not found</h3>
        <a href="/" className="button">
          Back to homepage
        </a>
        <style jsx>{``}</style>
      </section>
    );
  }
}

export default error;
