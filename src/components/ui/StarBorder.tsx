import './StarBorder.css';

interface StarBorderProps {
  children?: React.ReactNode;
  className?: string;
}

export default function StarBorder({ children, className = '' }: StarBorderProps) {
  return (
    <div className={`star-border-wrapper ${className}`}>
      <div className="star-border-glow" />
      {children}
    </div>
  );
}
