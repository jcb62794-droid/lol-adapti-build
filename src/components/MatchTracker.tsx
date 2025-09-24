import { useState, useEffect, useRef } from 'react';
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

  const rafIdRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);

  useEffect(() => {
    if (!isTracking) return;

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current + accumulatedRef.current;
      setGameTime(Math.floor(elapsed / 1000));
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (startRef.current !== null) {
        accumulatedRef.current += performance.now() - startRef.current;
      }
      startRef.current = null;
    };
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
            <div className="flex items-center gap-2">
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
              <Button
                variant="outline"
                onClick={() => { setGameTime(0); accumulatedRef.current = 0; startRef.current = null; }}
                disabled={gameTime === 0 && !isTracking}
              >
                Resetar
              </Button>
            </div>
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