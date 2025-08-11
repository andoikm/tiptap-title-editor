import {useRef, useEffect} from 'react';
import {TooltipManager} from '../../../src/index';

export const RenderedHtmlContainer = ({content}) => {
    const renderedHtmlRef = useRef(null);

    // Subscribe to rendered HTML section for automatic tooltip updates
    useEffect(() => {
        if (content && renderedHtmlRef.current) {
            const unsubscribe = TooltipManager.subscribe(renderedHtmlRef.current);
            return unsubscribe;
        }
    }, [content]);

    if (!content) return null;

    return (
        <div className="rendered-html-container">
            <h3 className="rendered-html-title">Rendered HTML (with tooltips)</h3>
            <div
                ref={renderedHtmlRef}
                data-rendered-html="true"
                dangerouslySetInnerHTML={{__html: content}}
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
            />
        </div>
    );
};
