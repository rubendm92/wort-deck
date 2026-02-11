export interface LoadAllNounsOptions {
  count?: number;
  tags?: string[];
  shuffle?: boolean;
}

export async function loadNouns(options?: LoadAllNounsOptions) {
  try {
    const params = new URLSearchParams();

    if (options?.count !== undefined) {
      params.append('count', options.count.toString());
    }

    if (options?.tags && options.tags.length > 0) {
      options.tags.forEach((tag) => params.append('tags', tag));
    }

    if (options?.shuffle !== undefined) {
      params.append('shuffle', options.shuffle.toString());
    }

    const url = `/api/nouns/all${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch nouns');
    }
    const data = await response.json();
    return data.nouns;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An error occurred');
  }
}
