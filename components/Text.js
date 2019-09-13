import cn from "classnames"

// Conditionally wrap a React element with another
const wrap = (needed, children, tag) => {
  if (!needed) return children

  return React.createElement(tag, {}, children)
}

// Wrap the text in modifier elements like bold and italics
const wrapModifiers = (
  component,
  { mark, underline, strike, bold, italic }
) => {
  let result = component

  result = wrap(mark, result, "mark")
  result = wrap(underline, result, "u")
  result = wrap(strike, result, "s")
  result = wrap(bold, result, "b")
  result = wrap(italic, result, "i")

  return result
}

const presets = {
  h1: `
    font-size: calc(39px + (49 - 39) * (100vw - 320px) / (1920 - 320));
    line-height: 1.01em;
    font-weight: 700;
    `,
  h2: `
    font-size: calc(26px + (35 - 26) * (100vw - 320px) / (1920 - 320));
    line-height: 1.1em;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 0.5em;
    letter-spacing: -.049375rem;
    `,
  h3: `
    font-size: calc(22px + (25 - 22) * (100vw - 320px) / (1920 - 320));
    line-height: 1.2em;
    font-weight: 700;
    margin-top: 0;
    letter-spacing: -.029375rem;
  `,
  h4: `
    font-size: calc(18px + (22 - 18) * (100vw - 320px) / (1920 - 320));
    font-weight: normal;
    letter-spacing: -.020625rem;
  `,
  h5: `
    font-size: calc(16px + (18 - 16) * (100vw - 320px) / (1920 - 320));
    font-weight: 700;
    margin: 0;
    margin-bottom: 0.5em;
    letter-spacing: -.01125rem;
    `,
  p: `
    font-size: 16px;
    line-height: 1.5em;
  `,
  small: `
    font-size: calc(14px + (15 - 14) * (100vw - 320px) / (1920 - 320));
    line-height: 1.5em;
  `,
  description: `
    text-transform: uppercase;
    font-size: 12px;
  `,
  span: ``
}

const getComponent = defaultElement => {
  const C = ({
    type,
    noMargin,
    xlarge,
    hasDecoration,
    xsmall,
    weight,
    code,
    uppercase,
    capitalize,
    Component = defaultElement,
    children,
    className,
    ...props
  }) => {
    return (
      <Component
        className={cn(className, { "geist-text-no-margin": noMargin })}
        {...props}
      >
        {children}
        {hasDecoration && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="46"
            viewBox="0 0 55 46"
            className="decoration"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="#41EF8B"
              stroke-linecap="square"
              stroke-width="4"
            >
              <path d="M41.537 4.374L33.423 15.96M20.98 2.342L22.9 15.36M52.28 23.793l-12.887 2.65M37.521 35.968l9.432 6.604M2.795 11.652l9.432 6.605" />
            </g>
          </svg>
        )}
        <style jsx>
          {`
            ${Component} {
              ${hasDecoration ? "position: relative;" : ""};
              font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
              ${hasDecoration ? "display: inline-block" : ""};
              ${presets[defaultElement]}
              ${xlarge ? "line-height: 1.01em;" : ""};
              ${noMargin ? "margin: 0;" : ""}
              ${weight ? `font-weight: ${weight};` : ""}
              ${uppercase ? "text-transform: uppercase;" : ""}
              ${capitalize ? "text-transform: capitalize;" : ""};
              ${xlarge ? "font-size: 4.5rem;" : ""};
              ${xsmall ? "font-size: 0.875rem;" : ""};
            }

            .decoration {
              position: absolute;
              top: 0%;
              right: 0;
              transform: translate(50%, -40%);
            }

            @media (max-width: 800px) {
              ${Component} {
                ${xlarge ? "font-size: 2rem;" : ""};
                ${xlarge ? "line-height: 1.31em;" : ""};
              }
            }
          `}
        </style>
      </Component>
    )
  }

  return C
}

export const H1 = getComponent("h1")
export const H2 = getComponent("h2")
export const H3 = getComponent("h3")
export const H4 = getComponent("h4")
export const H5 = getComponent("h5")
export const P = getComponent("p")
export const Small = getComponent("small")
export const Description = getComponent("description")
export const Span = getComponent("span")

const components = [H1, H2, H3, H4, H5, P, Small, Description, Span]

const Text = ({
  // HTML element
  Component,
  // styling
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  small,
  description,
  span,
  // wrapper
  mark,
  underline,
  strike,
  bold,
  italic,
  // react
  children,
  ...props
}) => {
  const Styler =
    components[
      [h1, h2, h3, h4, h5, p, small, description, span].indexOf(true)
    ] || P

  return (
    <Styler Component={Component} {...props}>
      {wrapModifiers(children, { mark, underline, strike, bold, italic })}
    </Styler>
  )
}

export default Text
