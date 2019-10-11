import cn from "classnames";

export default function Image({
  src,
  alt,
  hasBorder,
  height,
  width,
  bgColor = false
}) {
  return (
    <figure className={cn({ "has-border": hasBorder })}>
      <img src={src} alt={alt} />
      <style jsx>{`
        figure {
          display: flex;
          margin: 0;
          border-radius: 5px;
          overflow: hidden;
          max-height: 450px;
          ${height && `height: ${height};`};
          ${width && `width: ${width};`};
        }

        figure.has-border {
          border: 1px solid #2479ff;
        }

        img {
          display: flex;
          width: 100%;
          object-fit: cover;
          object-position: center;
          ${bgColor && `background-color: ${bgColor};`};
        }

        @media (max-width: 1050px) {
          figure {
            max-height: 225px;
          }
          img {
            object-fit: cover;
            object-position: top;
          }
        }
      `}</style>
    </figure>
  );
}
