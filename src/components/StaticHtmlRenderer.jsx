import { useRef } from 'react';
import { useStaticHtmlTooltips } from './TooltipPlugin';

const StaticHtmlRenderer = ({ htmlContent, className = '' }) => {
  const containerRef = useRef(null);

  // Apply tooltip functionality to the static HTML content
  useStaticHtmlTooltips(containerRef, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default StaticHtmlRenderer;
