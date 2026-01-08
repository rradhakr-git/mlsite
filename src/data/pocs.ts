export type PocStatus = 'Live' | 'Demo' | 'Demo on request';

export interface PocLinks {
  demo?: string;
  github?: string;
  external?: string;
}

export interface Poc {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: PocStatus;
  imageUrl: string;
  links?: PocLinks;
  featured?: boolean;
}

export const pocs: Poc[] = [
  {
    slug: 'health-payer-intent-classifier',
    title: 'Health Payer Intent Classifier — End-to-End Pipeline',
    summary: 'Classifies health insurance customer queries into 21 intent categories for routing and automation. Trained using privacy-preserving, locally hosted LLM-based data augmentation.',
    category: 'AI/ML',
    status: 'Live',
    imageUrl: '/images/placeholders/classifierImage2.png',
    featured: true,
    links: {
      demo: 'https://huggingface.co/spaces/rradhakr/GetIntent',
      github: 'https://github.com/rradhakr-git/-distilbert-health-payer-intent-classification',
    },
  },
  {
    slug: 'multimodal-pdf-table-extraction',
    title: 'Multimodal PDF Table Extraction with Intelligent Model Routing',
    summary: 'Extracts structured tables and text from PDFs using vision-language models, with automatic model routing that reduces processing costs and optimizes accuracy.',
    category: 'Data Processing',
    status: 'Demo on request',
    imageUrl: '/images/placeholders/pdfextract1.jpg',
  },
  {
    slug: 'mcp-agent',
    title: 'MCP-Based Multi-API Agent with Google ADK Integration',
    summary: 'Implements the Model Context Protocol to expose multiple external APIs as agent-callable tools. Demonstrates clean separation between tool execution and LLM reasoning using CLI and Streamlit clients.',
    category: 'AI/ML',
    status: 'Live',
    imageUrl: '/images/placeholders/MCPImage1.png',
    links: {
      demo: 'https://app-public-mcp-mlinnovationlab.streamlit.app/',
    },
  },
  {
    slug: 'medical-plan-selection-advisor',
    title: 'Medical Plan Selection Advisor Using Predictive Cost Modeling',
    summary: 'Analyzes household profile and expected healthcare usage to recommend the best-fit medical plan from employer options.',
    category: 'Decision Support',
    status: 'Demo on request',
    imageUrl: '/images/placeholders/dc.jpg',
  },
];
