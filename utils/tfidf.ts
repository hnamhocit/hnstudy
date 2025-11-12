export interface TfidfMatch {
  index: number;
  score: number;
  definition: string;
  keywords?: string[];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1);
}

function buildVocab(docs: string[]): Map<string, number> {
  const vocab = new Map<string, number>();
  docs.forEach(doc => {
    const terms = new Set(tokenize(doc));
    terms.forEach(term => {
      if (!vocab.has(term)) {
        vocab.set(term, vocab.size);
      }
    });
  });
  return vocab;
}

function tf(doc: string, vocab: Map<string, number>): number[] {
  const tokens = tokenize(doc);
  const counts = new Array(vocab.size).fill(0);
  const freqMap = new Map<string, number>();

  tokens.forEach(token => {
    freqMap.set(token, (freqMap.get(token) || 0) + 1);
  });

  for (const [token, count] of freqMap) {
    const index = vocab.get(token);
    if (index !== undefined) {
      counts[index] = count / tokens.length;
    }
  }

  return counts;
}

function idf(docs: string[], vocab: Map<string, number>): number[] {
  const N = docs.length;
  const docCount = new Array(vocab.size).fill(0);

  docs.forEach(doc => {
    const seen = new Set(tokenize(doc));
    seen.forEach(token => {
      const index = vocab.get(token);
      if (index !== undefined) {
        docCount[index]++;
      }
    });
  });

  return docCount.map(count => Math.log(1 + N / (1 + count)));
}

function dot(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function norm(vector: number[]): number {
  return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = dot(a, b);
  const normA = norm(a);
  const normB = norm(b);
  return dotProduct / (normA * normB + 1e-12);
}

function findMatchingKeywords(target: string, definition: string): string[] {
  const targetWords = new Set(tokenize(target));
  const definitionWords = new Set(tokenize(definition));

  return Array.from(targetWords).filter(word =>
    definitionWords.has(word)
  ).slice(0, 5); // Return top 5 matching keywords
}

export function findBestTFIDFMatch(target: string, definitions: string[]): TfidfMatch {
  if (!target.trim() || definitions.length === 0) {
    throw new Error('Target and definitions must not be empty');
  }

  const docs = [target, ...definitions];
  const vocab = buildVocab(docs);
  const idfVector = idf(docs, vocab);

  const targetTF = tf(target, vocab);
  const targetVector = targetTF.map((val, i) => val * idfVector[i]);

  let bestMatch: TfidfMatch = {
    index: -1,
    score: -1,
    definition: ""
  };

  definitions.forEach((definition, index) => {
    const defTF = tf(definition, vocab);
    const defVector = defTF.map((val, i) => val * idfVector[i]);

    const score = cosineSimilarity(targetVector, defVector);

    if (score > bestMatch.score) {
      bestMatch = {
        index,
        score,
        definition,
        keywords: findMatchingKeywords(target, definition)
      };
    }
  });

  return bestMatch;
}

export function findTopTFIDFMatches(
  target: string,
  definitions: string[],
  topK: number = 3
): TfidfMatch[] {
  if (!target.trim() || definitions.length === 0) {
    return [];
  }

  const docs = [target, ...definitions];
  const vocab = buildVocab(docs);
  const idfVector = idf(docs, vocab);

  const targetTF = tf(target, vocab);
  const targetVector = targetTF.map((val, i) => val * idfVector[i]);

  const matches: TfidfMatch[] = definitions.map((definition, index) => {
    const defTF = tf(definition, vocab);
    const defVector = defTF.map((val, i) => val * idfVector[i]);
    const score = cosineSimilarity(targetVector, defVector);

    return {
      index,
      score,
      definition,
      keywords: findMatchingKeywords(target, definition)
    };
  });

  // Sort by score descending and return top K
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
