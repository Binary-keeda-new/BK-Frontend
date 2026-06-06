import { useState, useEffect, useCallback } from 'react';
import { SocialPost } from '../types/socialFeed.types';
import { getSocialFeed } from '../services/socialFeed.service';

export function useSocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSocialFeed();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load feed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return { posts, isLoading, error, refresh: fetchFeed };
}
