import cn from "classnames"

export default function Image({ hasBorder }) {
  return (
    <figure className={cn({ "has-border": hasBorder })}>
      <img src={src} alt={alt} loading="lazy" />
      <style jsx>{`
        figure {
          margin: 0;
          border-radius: 5px;
          overflow: hidden;
        }

        img {
        }
      `}</style>
    </figure>
  )
}
