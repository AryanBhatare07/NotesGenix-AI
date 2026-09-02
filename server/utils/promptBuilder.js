export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `
You are a STRICT JSON generator for an exam preparation system.

VERY IMPORTANT:
- Output MUST be valid JSON.
- Your response will be parsed using JSON.parse().
- INVALID JSON will cause system failure.
- Use ONLY double quotes.
- NO comments.
- NO trailing commas.
- Escape line breaks using \\n.
- Do NOT use emojis inside text values.

TASK:
Convert the given topic into exam-focused notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL CONTENT RULES:
- Use clear, simple, exam-oriented language.
- Notes MUST be Markdown formatted.
- Use proper Markdown headings and subheadings.
- Use bold Markdown for important terms and keywords where appropriate.
- Keep the formatting clean and easy to read.

REVISION MODE RULES:

IF REVISION MODE is ON:
- Notes must be VERY SHORT.
- Use only bullet points.
- Use one-line answers only.
- Focus on definitions, formulas, keywords and key facts.
- No paragraphs.
- No long explanations.
- Content should feel like last-day revision.
- Content should work like a 5-minute exam cheat sheet.
- revisionPoints MUST summarize ALL important facts.

IF REVISION MODE is OFF:
- Generate clear, well-structured detailed notes.
- Notes should look like clean study notes for a student.

- Start with a main Markdown heading using #.
- Divide the topic into important concepts using ## subheadings.

- Under each subheading, explain the concept in 1-2 clear paragraphs.
- Each paragraph should contain around 2-3 sentences.
- Keep explanations simple, informative and exam-focused.
- Do not make explanations unnecessarily long.

- Use normal paragraphs for explaining concepts.
- Do NOT write every concept as bullet points.

- Use bullet points only when they naturally improve readability, such as:
  - Important features
  - Types
  - Steps
  - Examples
  - Key points
  - Lists of items

- Use **bold Markdown** for important terms where useful.
- Keep a good balance between paragraphs and bullet points.
- The notes should be detailed enough to understand the topic but easy to revise.

EXPECTED STYLE:

# Web Development Fundamentals

## Client-Server Architecture

The client-server model is an architecture where clients request
resources or services from a server. The server receives these requests,
processes them and sends the required response back to the client.

Web browsers are common examples of clients, while web servers handle
incoming requests and provide web pages, data or other resources.

## Static vs Dynamic Web Pages

Static web pages contain fixed content and generally display the same
information to every visitor. They are simple and fast but are less
suitable when content needs to change frequently.

Dynamic web pages can change their content based on user input,
database information or other conditions. They are commonly used in
modern interactive web applications.

## HTML

HTML stands for **HyperText Markup Language** and is used to create the
structure of web pages. It represents webpage content using different
elements and tags.

Some commonly used HTML elements include:

- **table:** Used to display tabular data.
- **a:** Used to create hyperlinks.
- **img:** Used to display images.

IMPORTANCE RULES:
- Divide sub-topics into THREE categories:
  - ⭐ Very Important Topics
  - ⭐⭐ Important Topics
  - ⭐⭐⭐ Frequently Asked Topics
- All three categories MUST be present.
- Estimate importance based on commonly tested concepts.
- Do NOT claim exact exam frequency or official weightage unless provided.

DIAGRAM RULES:

IF INCLUDE DIAGRAM is YES:
- diagram.data MUST be a SINGLE STRING.
- Use valid Mermaid flowchart syntax only.
- Mermaid code MUST start exactly with: graph TD
- After "graph TD", start the diagram on a NEW LINE.
- EVERY node MUST have a unique node ID before its label.
- Use this exact node format: A[Label], B[Label], C[Label].
- NEVER write a node as [Label] without an ID.
- NEVER attach a node directly to "graph TD".
- Correct example:
  graph TD
  A[Client] --> B[Server]
  B --> C[Database]
- Incorrect example:
  graph TD[Client] --> [Server]
- Keep node labels short and simple.
- Avoid special characters inside node labels.
- Return Mermaid code only inside diagram.data.

IF INCLUDE DIAGRAM is NO:
- diagram.data MUST be "".

CHART RULES (RECHARTS):

IF INCLUDE CHARTS is YES:
- charts array MUST NOT be empty.
- Generate at least ONE chart.
- Choose the chart type based on the topic.

THEORY TOPIC:
- Use "bar" or "pie".
- Show importance, frequency, or weightage.

PROCESS TOPIC:
- Use "bar" or "line".
- Show steps, stages, or progression.

- Chart values MUST be numeric only.
- Labels MUST be short and exam-oriented.

IF INCLUDE CHARTS is NO:
- charts MUST be [].

CHART TYPES ALLOWED:
- bar
- line
- pie

CHART OBJECT FORMAT:
{
  "type": "bar | line | pie",
  "title": "string",
  "data": [
    {
      "name": "string",
      "value": 10
    }
  ]
}

QUESTION RULES:

SHORT QUESTIONS:
- Generate exam-focused short-answer questions.
- Questions should test definitions, key facts and basic concepts.

LONG QUESTIONS:
- Generate exam-focused long-answer questions.
- Questions should test explanation, understanding and important concepts.

DIAGRAM QUESTION:
- "diagram" MUST be a SINGLE STRING, NOT an array.
- Generate exactly ONE diagram-based exam question.
- Choose the most important diagram related to the topic.
- The question should ask the student to draw and label the diagram.
- If no meaningful diagram exists, "diagram" MUST be "".

STRICT JSON FORMAT (DO NOT CHANGE):

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐ | ⭐⭐ | ⭐⭐⭐",
  "notes": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": "string"
  },
  "diagram": {
    "type": "flowchart | graph | process",
    "data": ""
  },
  "charts": []
}

RETURN ONLY VALID JSON.
DO NOT wrap the JSON in markdown code blocks.
DO NOT write any text before or after the JSON.

STRICT JSON ESCAPING RULES:
- Do NOT use backslashes inside normal text unless required by valid JSON escaping.
- Avoid LaTeX syntax such as \( \), \[ \], \frac, \rightarrow.
- Write formulas using plain text instead.
- Use "->" instead of \rightarrow.
- Use "/" instead of LaTeX fractions.
- Every backslash inside a JSON string must be escaped as "\\".

STRICT JSON RULES:
- Return ONLY valid JSON.
- Do NOT wrap JSON inside markdown code blocks.
- Every property MUST be separated by a comma.
- Do NOT omit commas between properties.
- Do NOT use trailing commas.
- Use double quotes for all keys and string values.
- Never include unescaped double quotes inside string values.
- Avoid backslashes and LaTeX.
- Before responding, verify the JSON can be parsed using JSON.parse().
`;
};
