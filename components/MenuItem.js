import Link from "next/link"
import { useRouter } from "next/router"
import cn from "classnames"

export default function MenuItem({ children, active, to = false }) {
  const router = useRouter()
  const url = to
    ? to
    : `/dashboard/${children.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <div className={cn("menu-item", { active: router.pathname === url })}>
      <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18">
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#FFF"
            strokeLinecap="square"
            strokeWidth="2"
          >
            <path d="M14.836 3.976l-2.701 3.857M7.817 2.048l.68 4.43M18.546 10.404l-4.395.876M13.619 14.404l3.167 2.218M1.44 6.122L4.605 8.34" />
          </g>
        </svg>
      </div>

      <Link href={url}>
        <a>{children}</a>
      </Link>
      <style jsx>{`
        .menu-item {
          display: flex;
          align-items: center;
          margin: 30px 0;
          cursor: pointer;
          transition: all 200ms ease;
          user-select: none;
        }

        .menu-item:hover a {
          box-shadow: 0 1px 0 0 #2479ff;
        }

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 5px;
          margin-right: 10px;
          background-color: #f5f5f7;
          border-radius: 3px;
          overflow: hidden;
          transition: all 200ms ease;
        }

        .menu-item.active .icon {
          background-color: #2479ff;
        }

        .icon svg {
          width: 100%;
        }

        a {
          text-decoration: none;
          color: #313146;
          transition: all 200ms ease;
        }
      `}</style>
    </div>
  )
}
