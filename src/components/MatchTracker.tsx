import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { champions } from '@/data/champions';

export const MatchTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const { t } = useApp();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('match_tracker_title')}</CardTitle>
          <CardDescription>Acompanhe sua partida em tempo real</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{t('game_time')}: {formatTime(gameTime)}</span>
            </div>
            <Button 
              onClick={() => setIsTracking(!isTracking)}
              variant={isTracking ? "destructive" : "default"}
            >
              {isTracking ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  {t('stop_tracking')}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {t('start_tracking')}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isTracking && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{t('ai_recommendations_title')}</CardTitle>
              <CardDescription>Sugestões baseadas no estado atual da partida</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary">Focus no Farm</Badge>
                <Badge variant="secondary">{t('next_objective')}: Dragon</Badge>
                <Badge variant="secondary">Build Defensiva Recomendada</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">{t('allied_team')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Jinx', 'Graves', 'Yasuo', 'Garen', 'Thresh'].map((champion, index) => (
                    <div key={champion} className="flex items-center justify-between p-2 bg-secondary rounded">
                      <span>{champion}</span>
                      <Badge variant="outline">ADC</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">{t('enemy_team')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Vayne', 'Lee Sin', 'Zed', 'Darius', 'Leona'].map((champion, index) => (
                    <div key={champion} className="flex items-center justify-between p-2 bg-secondary rounded">
                      <span>{champion}</span>
                      <Badge variant="outline">ADC</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};