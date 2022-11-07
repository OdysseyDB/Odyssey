import "./AccentButton.scss";

function AccentButton({ children, isLink, ...props }) {
  if (isLink) {
    return (
      <a className="AccentButtonWrapper" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className="AccentButtonWrapper" {...props}>
      {children}
    </button>
  );
}

export default AccentButton;
