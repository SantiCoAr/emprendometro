export interface Strength {
  dimension: string;
  score: number;
  insight: string;
}

export interface Improvement {
  dimension: string;
  score: number;
  insight: string;
  quick_habits: string[];
}

export interface ActionPlan {
  next_7_days: string[];
  next_30_days: string[];
}

export interface FeedbackPayload {
  headline: string;
  summary: string;
  strengths: Strength[];
  improvements: Improvement[];
  action_plan: ActionPlan;
  recommended_role: string;
}
