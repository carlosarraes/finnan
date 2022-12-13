function Footer() {
  return (
    <footer className="flex justify-center items-center text-xs text-center mt-16">
      <div>
        <a href="https://carlosarraes.github.io/" target="_blank" rel="noreferrer">
          <button
            id="devfolio"
            className="space-x-1 border p-2 rounded-l-md opacity-80 bg-slate-900 hover:opacity-100 duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              style={ { display: 'inline-block', userSelect: 'none', verticalAlign: 'text-bottom', overflow: 'visible' } }
            >
              <path
                fillRule="evenodd"
                d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"
              />
            </svg>
            <span>carlos arraes</span>
          </button>
        </a>
      </div>
      <div>
        <a href="https://github.com/carlosarraes/pokeguess" target="_blank" rel="noreferrer">
          <button
            className="space-x-1 border p-2 rounded-r-md opacity-80 bg-slate-900  hover:opacity-100 duration-200"
          >
            <svg
              aria-hidden="true"
              role="img"
              className="octicon octicon-code"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              style={ { display: 'inline-block', userSelect: 'none', verticalAlign: 'text-bottom', overflow: 'visible' } }
            >
              <path
                fillRule="evenodd"
                d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"
              />
            </svg>
            <span className="">Código</span>
          </button>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
