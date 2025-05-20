import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export interface Opportunity {
  id: number;
  nom: string;
  client: number;
  client_nom: string;
  montant: number;
  probabilite: number;
  etape: string;
  date_conclusion_estimee: string | null;
}

export interface Stage {
  id: string;
  title: string;
  opportunityIds: string[];
}

export interface PipelineData {
  stages: Record<string, Stage>;
  stageOrder: string[];
  opportunities: Record<string, Opportunity>;
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const response = await axios.get(`${API_URL}/opportunites/`);
  return response.data;
}

export async function updateOpportunityStage(opportunityId: number, newStage: string): Promise<Opportunity> {
  const response = await axios.patch(`${API_URL}/opportunites/${opportunityId}/update_etape/`, {
    etape: newStage
  });
  return response.data;
}

export function transformApiDataToPipeline(opportunities: Opportunity[]): PipelineData {
  const stages: Record<string, Stage> = {
    prospect: {
      id: 'prospect',
      title: 'Prospect',
      opportunityIds: [],
    },
    qualification: {
      id: 'qualification',
      title: 'Qualification',
      opportunityIds: [],
    },
    proposition: {
      id: 'proposition',
      title: 'Proposition',
      opportunityIds: [],
    },
    negociation: {
      id: 'negociation',
      title: 'Négociation',
      opportunityIds: [],
    },
    conclusion: {
      id: 'conclusion',
      title: 'Conclusion',
      opportunityIds: [],
    },
  };

  const stageOrder = ['prospect', 'qualification', 'proposition', 'negociation', 'conclusion'];
  const opportunitiesMap: Record<string, Opportunity> = {};

  opportunities.forEach((opportunity) => {
    const opportunityId = opportunity.id.toString();
    opportunitiesMap[opportunityId] = opportunity;
    stages[opportunity.etape].opportunityIds.push(opportunityId);
  });

  return {
    stages,
    stageOrder,
    opportunities: opportunitiesMap,
  };
} 