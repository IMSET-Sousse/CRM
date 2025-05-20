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
  notes?: string;
  date_creation: string;
  derniere_modification: string;
}

export interface Stage {
  id: string;
  title: string;
  opportunityIds: string[];
}

export interface PipelineData {
  opportunities: Record<string, Opportunity>;
  stages: Record<string, Stage>;
  stageOrder: string[];
}

export interface CreateOpportunityData {
  nom: string;
  client: number;
  montant: number;
  probabilite: number;
  etape: string;
  date_conclusion_estimee?: string;
  notes?: string;
}

export interface UpdateOpportunityData {
  nom?: string;
  client?: number;
  montant?: number;
  probabilite?: number;
  etape?: string;
  date_conclusion_estimee?: string;
  notes?: string;
}

// Récupérer toutes les opportunités
export async function fetchOpportunities(): Promise<Opportunity[]> {
  const response = await axios.get(`${API_URL}/opportunites/`);
  return response.data;
}

// Récupérer une opportunité par son ID
export async function fetchOpportunity(id: number): Promise<Opportunity> {
  const response = await axios.get(`${API_URL}/opportunites/${id}/`);
  return response.data;
}

// Créer une nouvelle opportunité
export async function createOpportunity(data: CreateOpportunityData): Promise<Opportunity> {
  const response = await axios.post(`${API_URL}/opportunites/`, data);
  return response.data;
}

// Mettre à jour une opportunité
export async function updateOpportunity(id: number, data: UpdateOpportunityData): Promise<Opportunity> {
  const response = await axios.patch(`${API_URL}/opportunites/${id}/`, data);
  return response.data;
}

// Supprimer une opportunité
export async function deleteOpportunity(id: number): Promise<void> {
  await axios.delete(`${API_URL}/opportunites/${id}/`);
}

// Mettre à jour l'étape d'une opportunité
export async function updateOpportunityStage(id: number, etape: string): Promise<Opportunity> {
  const response = await axios.patch(`${API_URL}/opportunites/${id}/update_etape/`, { etape });
  return response.data;
}

// Marquer une opportunité comme gagnée
export async function markOpportunityAsWon(id: number): Promise<Opportunity> {
  const response = await axios.patch(`${API_URL}/opportunites/${id}/`, {
    etape: 'conclusion',
    probabilite: 100
  });
  return response.data;
}

// Marquer une opportunité comme perdue
export async function markOpportunityAsLost(id: number): Promise<Opportunity> {
  const response = await axios.patch(`${API_URL}/opportunites/${id}/`, {
    etape: 'conclusion',
    probabilite: 0
  });
  return response.data;
}

// Transformer les données de l'API en format pour le pipeline
export function transformApiDataToPipeline(opportunities: Opportunity[]): PipelineData {
  const stages: Record<string, Stage> = {
    'qualification': {
      id: 'qualification',
      title: 'Qualification',
      opportunityIds: [],
    },
    'proposition': {
      id: 'proposition',
      title: 'Proposition',
      opportunityIds: [],
    },
    'negociation': {
      id: 'negociation',
      title: 'Négociation',
      opportunityIds: [],
    },
    'conclusion': {
      id: 'conclusion',
      title: 'Conclusion',
      opportunityIds: [],
    },
  };

  const stageOrder = ['qualification', 'proposition', 'negociation', 'conclusion'];
  const opportunitiesMap: Record<string, Opportunity> = {};

  opportunities.forEach((opportunity) => {
    opportunitiesMap[opportunity.id.toString()] = opportunity;
    const stage = stages[opportunity.etape];
    if (stage) {
      stage.opportunityIds.push(opportunity.id.toString());
    }
  });

  return {
    opportunities: opportunitiesMap,
    stages,
    stageOrder,
  };
} 