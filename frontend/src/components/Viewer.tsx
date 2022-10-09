import '../styles/Viewer.css';
import { Graphviz } from 'graphviz-react';
import { graphviz } from 'd3-graphviz';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { BaseType, Transition, transition } from 'd3';

const Viewer = ({ dot }: { dot: string }) => {
  const graphvizRoot = useRef(null);
  const parentContainer = useRef(null);

  const [dotHeight, setDotHeight] = useState(500);

  const resizeSvg = () => {
    if (parentContainer.current) {
      const { clientHeight } = parentContainer.current;

      setDotHeight(clientHeight);
    }
  };

  // Hook used to correctly size the svg
  useEffect(() => {
    resizeSvg();
  }, [parentContainer, resizeSvg]);

  // Change model transition
  useEffect(() => {
    if (graphvizRoot.current) {
      const { id } = graphvizRoot.current;
      graphviz(`#${id}`).transition(
        () => transition().duration(250) as any as Transition<BaseType, any, BaseType, any>
      );
      graphviz(`#${id}`)
        .addImage('https://awoc.github.io/distributed-discovery-demo/envelope.svg', '24', '18')
        .addImage('https://awoc.github.io/distributed-discovery-demo/envelope_full.svg', '24', '18')
        .renderDot(dot);
    }
  }, [graphvizRoot]);

  return (
    <div className="flex-auto w-full h-full bg-gray-100" ref={parentContainer}>
      <Graphviz
        className="h-full"
        dot={dot}
        options={{ zoom: true, useWorker: false, height: dotHeight }}
        ref={graphvizRoot}
      />
      <ControlButtons graphvizRoot={graphvizRoot} />
    </div>
  );
};

const ControlButtons = ({ graphvizRoot }: { graphvizRoot: React.MutableRefObject<null> }) => {
  const reset = useCallback(() => {
    if (graphvizRoot.current) {
      const { id } = graphvizRoot.current;
      graphviz(`#${id}`).resetZoom();
    }
  }, [graphvizRoot]);

  return (
    <div className="absolute bottom-4 right-4">
      <button
        type="button"
        className="rounded viewer-button shadow-md hover:shadow-lg focus:shadow-lg"
        onClick={reset}>
        <ArrowsExpandIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Viewer;
