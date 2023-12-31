export default function Button({ children }: { children: any }) {
  return (
    <button className="govuk-button" data-module="govuk-button">
      {children}
    </button>
  );
}

function StartButton({ children }: { children: any }) {
  return (
    <a
      href="#"
      role="button"
      draggable="false"
      className="govuk-button govuk-button--start"
      data-module="govuk-button"
    >
      {children}
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    </a>
  );
}

export { Button, StartButton };
