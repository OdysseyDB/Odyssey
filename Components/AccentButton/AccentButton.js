import "./AccentButton.scss";

function AccentButton({ children, isLink, className, ...props }) {
  if (isLink) {
    return (
      <a className={`AccentButtonWrapper ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={`AccentButtonWrapper ${className}`} {...props}>
      {children}
    </button>
  );
}

export default AccentButton;
