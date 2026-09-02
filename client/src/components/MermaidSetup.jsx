import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim();

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        const safeChart = cleanMermaidChart(diagram);
        const uniqueId = `mermaid-${Date.now()}`;

        const { svg } = await mermaid.render(
          uniqueId,
          safeChart
        );

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid render failed:", error);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef}></div>
    </div>
  );
};

export default MermaidSetup;