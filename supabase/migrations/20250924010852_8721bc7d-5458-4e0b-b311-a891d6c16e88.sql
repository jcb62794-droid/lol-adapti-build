-- Create champions table
CREATE TABLE public.champions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  title TEXT,
  role TEXT NOT NULL,
  tier TEXT NOT NULL,
  win_rate DECIMAL(5,2) NOT NULL,
  pick_rate DECIMAL(5,2) NOT NULL,
  ban_rate DECIMAL(5,2) NOT NULL,
  difficulty INTEGER NOT NULL,
  tags TEXT[] NOT NULL,
  recommended_items TEXT[] NOT NULL,
  image TEXT,
  counters TEXT[],
  strong_against TEXT[],
  abilities JSONB,
  stats JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create items table
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  cost INTEGER NOT NULL,
  stats JSONB,
  categories TEXT[] NOT NULL,
  tier TEXT NOT NULL,
  win_rate DECIMAL(5,2),
  build_rate DECIMAL(5,2),
  damage_type TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  image TEXT,
  passive TEXT,
  active TEXT,
  builds_into TEXT[],
  builds_from TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create match_analysis table for storing real-time analysis
CREATE TABLE public.match_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  champion_name TEXT NOT NULL,
  user_lane TEXT NOT NULL,
  enemy_team JSONB NOT NULL,
  ally_team JSONB,
  recommended_build JSONB NOT NULL,
  counter_picks TEXT[],
  analysis_data JSONB,
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.champions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to champions and items
CREATE POLICY "Champions are viewable by everyone" 
ON public.champions 
FOR SELECT 
USING (true);

CREATE POLICY "Items are viewable by everyone" 
ON public.items 
FOR SELECT 
USING (true);

-- Create policies for match analysis (user-specific)
CREATE POLICY "Users can view their own match analysis" 
ON public.match_analysis 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create match analysis" 
ON public.match_analysis 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_champions_updated_at
  BEFORE UPDATE ON public.champions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_champions_name ON public.champions(name);
CREATE INDEX idx_champions_role ON public.champions(role);
CREATE INDEX idx_champions_tier ON public.champions(tier);

CREATE INDEX idx_items_name ON public.items(name);
CREATE INDEX idx_items_categories ON public.items USING GIN(categories);
CREATE INDEX idx_items_damage_type ON public.items(damage_type);

CREATE INDEX idx_match_analysis_user_id ON public.match_analysis(user_id);
CREATE INDEX idx_match_analysis_champion ON public.match_analysis(champion_name);