import "./PercentCircle.scss";

function PercentCircle({ percent }) {
  const strokeColor = () => {
    if (percent >= 0 && percent <= 49) return "#d64059";
    else if (percent >= 50 && percent <= 89) return "#f3a024";
    else if (percent >= 90 && percent <= 100) return "#3b9fbe";
  };
  return (
    <div className="PercentCircle">
      <svg viewBox="0 0 36 36" className="PercentCircle__chart">
        <path
          className="PercentCircle__track"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="PercentCircle__bar"
          strokeDasharray={`${percent}, 100`}
          stroke={strokeColor()}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="PercentCircle__text">
          {percent}%
        </text>
      </svg>
    </div>
  );
}

export default PercentCircle;
