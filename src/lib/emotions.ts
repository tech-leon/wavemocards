import { createServerClient } from './supabase';

// Types - simplified interfaces for the app
export interface EmotionCategory {
  id: number;
  name: string;
  slug: string;
  display_order: number;
}

export interface EmotionCard {
  id: number;
  category_id: number;
  name: string;
  description?: string | null;
  example?: string | null;
  image_path?: string | null;
}

export interface AboutEmotion {
  id: number;
  key: string;
  title: string;
  content: string;
  display_order: number;
}

// Category slug to Chinese name mapping
export const categoryNames: Record<string, string> = {
  happy: '快樂',
  expectation: '期待',
  relieved: '安心',
  unstable: '不安',
  amazed: '驚訝',
  sadness: '低落',
  hate: '討厭',
  anger: '生氣',
  others: '其他',
};

// Category slug to representative card ID mapping (for display)
export const categoryRepresentativeCards: Record<string, number> = {
  happy: 2,
  expectation: 8,
  relieved: 15,
  unstable: 21,
  amazed: 26,
  sadness: 34,
  hate: 44,
  anger: 51,
  others: 55,
};

// Fallback categories data
const fallbackCategories: EmotionCategory[] = [
  { id: 1, name: '快樂', slug: 'happy', display_order: 1 },
  { id: 2, name: '期待', slug: 'expectation', display_order: 2 },
  { id: 3, name: '安心', slug: 'relieved', display_order: 3 },
  { id: 4, name: '不安', slug: 'unstable', display_order: 4 },
  { id: 5, name: '驚訝', slug: 'amazed', display_order: 5 },
  { id: 6, name: '低落', slug: 'sadness', display_order: 6 },
  { id: 7, name: '討厭', slug: 'hate', display_order: 7 },
  { id: 8, name: '生氣', slug: 'anger', display_order: 8 },
  { id: 9, name: '其他', slug: 'others', display_order: 9 },
];

// Fallback cards data (sample - you can add more)
const fallbackCards: EmotionCard[] = [
  { id: 1, category_id: 1, name: '滿足', description: '一種心理或情感上的滿意狀態。', example: '我完成了自己今天的讀書目標，讓我感到很滿足。', image_path: '/images/emoCards/1.svg' },
  { id: 2, category_id: 1, name: '快樂', description: '對事情感到滿意的反應，令人心情良好、滿足和舒暢。', example: '放學後，我和好朋友一起去吃東西、聊天，而感到好快樂。', image_path: '/images/emoCards/2.svg' },
  { id: 3, category_id: 1, name: '幸福', description: '喜悅滿足，快樂愉悅，煩惱離開，心情舒適愉快的美好感覺。', example: '放學後，我和好朋友一起去吃東西、聊天，而感到好快樂。', image_path: '/images/emoCards/3.svg' },
  { id: 4, category_id: 1, name: '自豪', description: '為自己的努力或成就而感到自信和滿足。', example: '老師讚揚了我在課堂上的發表，讓我感到很自豪與開心。', image_path: '/images/emoCards/4.svg' },
  { id: 5, category_id: 1, name: '興奮', description: '一種充滿期待和熱情的感覺，讓人難以掩藏內心的喜悅和興趣。', example: '收到期待已久的新遊戲，我感到非常興奮，迫不及待地想玩它。', image_path: '/images/emoCards/5.svg' },
  { id: 6, category_id: 1, name: '痛快', description: '做事或表達感受時，無拘束、爽快，感覺很舒暢和暢快。', example: '趁著假日，我大聲唱歌跳舞，真的玩得很痛快。', image_path: '/images/emoCards/6.svg' },
  { id: 7, category_id: 1, name: '狂喜', description: '極度興奮和高興，讓人情緒飆升到極點的快樂感受。', example: '考試得了滿分，我簡直狂喜地跳了起來，好開心！', image_path: '/images/emoCards/7.svg' },
  { id: 8, category_id: 2, name: '期待', description: '充滿期盼，期待未來美好事情的到來，心情充滿期待與興奮。', example: '暑假即將到來，我充滿期待地計畫著可以做的有趣事情。', image_path: '/images/emoCards/8.svg' },
  { id: 9, category_id: 2, name: '有信心', description: '自信而確信，相信能夠成功或克服困難的堅定信念。', example: '因為有充分的準備，我有信心能夠在演講比賽中有良好的表現。', image_path: '/images/emoCards/9.svg' },
  { id: 10, category_id: 2, name: '充滿興趣', description: '對某事感到好奇和熱情，願意投入時間和精力，感受快樂。', example: '我對畫畫充滿興趣，每天放學後都投入好幾個小時畫畫。', image_path: '/images/emoCards/10.svg' },
  { id: 11, category_id: 2, name: '渴望', description: '強烈期望實現的感受，迫切希望得到或達成某事的內心渴求。', example: '我渴望能找到自己的興趣與熱情，讓生活快樂而精彩。', image_path: '/images/emoCards/11.svg' },
  { id: 12, category_id: 3, name: '舒服', description: '感到身心愉悅和輕鬆，讓人感受到安逸和放鬆。', example: '躺在舒適的床休息，感到非常舒服。', image_path: '/images/emoCards/12.svg' },
  { id: 15, category_id: 3, name: '安心', description: '內心安寧，沒有擔憂，感到安全和放心。', example: '在家中，我感到身邊的親人，讓我感到安心和溫暖。', image_path: '/images/emoCards/15.svg' },
  { id: 21, category_id: 4, name: '不安', description: '對未知或有風險的事情感到焦慮和不放心，內心無法放鬆。', example: '面對考試，我感到很不安，不確定自己是否能夠考好。', image_path: '/images/emoCards/21.svg' },
  { id: 26, category_id: 5, name: '錯愕', description: '突然受到意外信息或事件衝擊，導致感到極度驚訝和無法反應。', example: '被選為班長，我感到錯愕，從未料想到有這樣的結果。', image_path: '/images/emoCards/26.svg' },
  { id: 34, category_id: 6, name: '沮喪', description: '因為受到挫敗、阻礙或無法達成目標，而感到情緒低落、困擾或不滿意。', example: '嘗試與班上同學建立友誼，卻遭遇誤解，讓我感到很沮喪。', image_path: '/images/emoCards/34.svg' },
  { id: 44, category_id: 7, name: '自卑', description: '對自己的能力、價值感到不足或不夠，造成情緒上的不安和不自信。', example: '我對自己的缺點和身材，會感到自卑和羞愧。', image_path: '/images/emoCards/44.svg' },
  { id: 51, category_id: 8, name: '煩躁', description: '情緒不安定，感到不耐煩或易怒。', example: '弟弟一直吵鬧，讓我感到很煩躁。', image_path: '/images/emoCards/51.svg' },
  { id: 55, category_id: 9, name: '釋懷', description: '放下過去的情感、困擾或煩惱，讓自己心情得到解脫和寬慰。', example: '面對失敗，我練習接受並慢慢釋懷，重新開始。', image_path: '/images/emoCards/55.svg' },
];

// Fallback about emotions data
const fallbackAboutEmotions: AboutEmotion[] = [
  { id: 1, key: 'whatIsEmotion', title: '什麼是情緒？', content: '情緒英文是emotion，代表流動在我們身體的能量。當我們受到刺激，引發出內心感受、身體反應、想法與行動，就是情緒。例如某人踏進後巷時，遇到一隻看來很兇惡的狗（刺激），覺得十分害怕，擔心自己被咬傷（內心感受和想法），不禁心跳加速和顫抖（身體反應），最終決定急步繞路離開（行動）。', display_order: 1 },
  { id: 2, key: '6BasicEmotions', title: '六種基本情緒', content: '博物學家達爾文提及過人類有六種基本情緒，包括快樂（happiness）、悲傷（sadness）、恐懼（fear）、厭惡（disgust）、憤怒（anger）和驚訝（surprise），屬於有助人類提高生存機會的本能情緒。其他複雜情緒如興奮、委屈、自卑、妒忌、內疚、寂寞等，則是由基本情緒混合衍生而成，並且經過學習與社會化之後產生。', display_order: 2 },
  { id: 3, key: 'goodOrBad', title: '情緒有好壞之分嗎？', content: '一般人習慣將情緒分為正負面，覺得快樂屬於正面情緒，悲傷、憤怒、恐懼則對人有害。其實情緒無分好與壞，每一種情緒都有其獨特意義。例如對於陌生環境感到恐懼不安，反映著對安全感的渴求，提醒我們遠離危險。悲傷時脆弱流淚，則可吸引關顧與扶持，促進人際聯繫。', display_order: 3 },
  { id: 4, key: 'healthyEmotion', title: '什麼是情緒健康？', content: '假如對情緒存在偏見，否定和壓抑自己的真正感覺，明明傷心卻扮開心，明明生氣卻默默忍受，很容易令身心健康出現問題。所謂情緒健康，不代表要時刻保持愉快心情，而是要有能力覺察自己的不同情緒，了解內心需要，並以健康恰當的方式去表達和調適，讓心靈回復平靜。', display_order: 4 },
];

/**
 * Get all emotion categories
 */
export async function getEmotionCategories(): Promise<EmotionCategory[]> {
  const supabase = createServerClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackCategories;
  }
  
  const { data, error } = await supabase
    .from('emotion_categories')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching emotion categories:', error);
    return fallbackCategories;
  }
  
  return data || fallbackCategories;
}

/**
 * Get emotion category by slug
 */
export async function getEmotionCategoryBySlug(slug: string): Promise<EmotionCategory | null> {
  const supabase = createServerClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackCategories.find(c => c.slug === slug) || null;
  }
  
  const { data, error } = await supabase
    .from('emotion_categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching emotion category:', error);
    return fallbackCategories.find(c => c.slug === slug) || null;
  }
  
  return data;
}

/**
 * Get all emotion cards
 */
export async function getEmotionCards(): Promise<EmotionCard[]> {
  const supabase = createServerClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackCards;
  }
  
  const { data, error } = await supabase
    .from('emotion_cards')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching emotion cards:', error);
    return fallbackCards;
  }
  
  return data || fallbackCards;
}

/**
 * Get emotion cards by category ID
 */
export async function getEmotionCardsByCategoryId(categoryId: number): Promise<EmotionCard[]> {
  const supabase = createServerClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackCards.filter(c => c.category_id === categoryId);
  }
  
  const { data, error } = await supabase
    .from('emotion_cards')
    .select('*')
    .eq('category_id', categoryId)
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching emotion cards by category:', error);
    return fallbackCards.filter(c => c.category_id === categoryId);
  }
  
  return data || fallbackCards.filter(c => c.category_id === categoryId);
}

/**
 * Get emotion cards grouped by category
 */
export async function getEmotionCardsGroupedByCategory(): Promise<Map<number, EmotionCard[]>> {
  const cards = await getEmotionCards();
  const grouped = new Map<number, EmotionCard[]>();
  
  cards.forEach(card => {
    const categoryId = card.category_id;
    if (!grouped.has(categoryId)) {
      grouped.set(categoryId, []);
    }
    grouped.get(categoryId)!.push(card);
  });
  
  return grouped;
}

/**
 * Get about emotions content
 */
export async function getAboutEmotions(): Promise<AboutEmotion[]> {
  const supabase = createServerClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackAboutEmotions;
  }
  
  const { data, error } = await supabase
    .from('about_emotions')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching about emotions:', error);
    return fallbackAboutEmotions;
  }
  
  return data || fallbackAboutEmotions;
}

/**
 * Get about emotion by key
 */
export async function getAboutEmotionByKey(key: string): Promise<AboutEmotion | null> {
  const supabase = createServerClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackAboutEmotions.find(e => e.key === key) || null;
  }
  
  const { data, error } = await supabase
    .from('about_emotions')
    .select('*')
    .eq('key', key)
    .single();
  
  if (error) {
    console.error('Error fetching about emotion:', error);
    return fallbackAboutEmotions.find(e => e.key === key) || null;
  }
  
  return data;
}

/**
 * Get emotion card by ID
 */
export async function getEmotionCardById(id: number): Promise<EmotionCard | null> {
  const supabase = createServerClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackCards.find(c => c.id === id) || null;
  }
  
  const { data, error } = await supabase
    .from('emotion_cards')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching emotion card:', error);
    return fallbackCards.find(c => c.id === id) || null;
  }
  
  return data;
}
