import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { getAboutEmotions } from '@/lib/emotions';
import { BackToTopButton } from '@/components/ui/BackToTopButton';

export const metadata: Metadata = {
  title: '浪潮情緒卡｜認識情緒',
  description: '了解什麼是情緒、六種基本情緒、情緒無分好壞、以及情緒的健康之道',
  keywords: ['情緒', '基本情緒', '情緒健康', '心理健康', '情緒管理'],
};

// Basic emotions for display
const basicEmotions = [
  { name: '快樂', image: 'aboutEmo_happy.svg' },
  { name: '悲傷', image: 'aboutEmo_sadness.svg' },
  { name: '恐懼', image: 'aboutEmo_fear.svg' },
  { name: '厭惡', image: 'aboutEmo_hate.svg' },
  { name: '憤怒', image: 'aboutEmo_anger.svg' },
  { name: '驚訝', image: 'aboutEmo_amazing.svg' },
];

export default async function AboutEmotionsPage() {
  const user = await getUser();
  const aboutEmotions = await getAboutEmotions();

  // Get content from database or use defaults
  const whatIsEmotion = aboutEmotions.find(e => e.key === 'whatIsEmotion');
  const sixBasicEmotions = aboutEmotions.find(e => e.key === '6BasicEmotions');
  const goodOrBad = aboutEmotions.find(e => e.key === 'goodOrBad');
  const healthyEmotion = aboutEmotions.find(e => e.key === 'healthyEmotion');

  return (
    <>
      <main className="px-3 sm:px-0">
        <div className="container mx-auto pb-4 pt-9">
          {/* Header */}
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
            <h2 className="text-main text-2xl font-bold">認識情緒</h2>
            <div className="flex justify-end gap-4">
              <span className="px-4 py-2 text-gray-500 dark:text-gray-300 font-medium">認識情緒</span>
              {user ? (
                <Link
                  href="/emo-cards"
                  className="px-4 py-2 border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors font-medium"
                >
                  情緒卡
                </Link>
              ) : (
                <EmoCardsLoginButton />
              )}
            </div>
          </div>

          {/* Introduction */}
          <div className="py-4">
            {/* What is Emotion */}
            <section className="mb-14">
              <h2 className="text-main text-xl font-bold mb-3">什麼是情緒？</h2>
              <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                {whatIsEmotion?.content || 
                  '情緒英文是emotion，代表流動在我們身體的能量。當我們受到刺激，引發出內心感受、身體反應、想法與行動，就是情緒。例如某人踏進後巷時，遇到一隻看來很兇惡的狗（刺激），覺得十分害怕，擔心自己被咬傷（內心感受和想法），不禁心跳加速和顫抖（身體反應），最終決定急步繞路離開（行動）。'}
              </p>
            </section>

            {/* 6 Basic Emotions */}
            <section className="mb-14">
              <h2 className="text-main text-xl font-bold mb-3">6大基本情緒</h2>
              <div className="mb-3 flex flex-wrap justify-center gap-6 md:gap-8">
                {basicEmotions.map((emotion) => (
                  <div key={emotion.name} className="flex flex-col items-center mb-5">
                    <div className="w-20 h-20 md:w-24 md:h-24 mb-2">
                      <Image
                        src={`/images/aboutEmotions/${emotion.image}`}
                        alt={emotion.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-800 dark:text-gray-100 font-medium">{emotion.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                {sixBasicEmotions?.content ||
                  '博物學家達爾文提及過人類有六種基本情緒，包括快樂（happiness）、悲傷（sadness）、恐懼（fear）、厭惡（disgust）、憤怒（anger）和驚訝（surprise），屬於有助人類提高生存機會的本能情緒。其他複雜情緒如興奮、委屈、自卑、妒忌、內疚、寂寞等，則是由基本情緒混合衍生而成，並且經過學習與社會化之後產生。'}
              </p>
            </section>

            {/* Good or Bad */}
            <section className="mb-14">
              <h2 className="text-main text-xl font-bold mb-3">情緒無分好與壞</h2>
              <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                {goodOrBad?.content ||
                  '一般人習慣將情緒分為正負面，覺得快樂屬於正面情緒，悲傷、憤怒、恐懼則對人有害。其實情緒無分好與壞，每一種情緒都有其獨特意義。例如對於陌生環境感到恐懼不安，反映著對安全感的渴求，提醒我們遠離危險。悲傷時脆弱流淚，則可吸引關顧與扶持，促進人際聯繫。'}
              </p>
            </section>

            {/* Healthy Emotion */}
            <section className="mb-14">
              <h2 className="text-main text-xl font-bold mb-3">情緒的健康之道</h2>
              <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                {healthyEmotion?.content ||
                  '假如對情緒存在偏見，否定和壓抑自己的真正感覺，明明傷心卻扮開心，明明生氣卻默默忍受，很容易令身心健康出現問題。所謂情緒健康，不代表要時刻保持愉快心情，而是要有能力覺察自己的不同情緒，了解內心需要，並以健康恰當的方式去表達和調適，讓心靈回復平靜。'}
              </p>
            </section>

            {/* Source */}
            <div className="text-right mb-16">
              <a
                href="https://wmc.hkfyg.org.hk/emo1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE] transition-colors"
              >
                引用文章來源：香港青年協會｜全健空間（九龍）
              </a>
            </div>
          </div>
        </div>
      </main>

      <BackToTopButton />
    </>
  );
}

// Redirect to WorkOS sign-in when not logged in
function EmoCardsLoginButton() {
  return (
    <form action={async () => {
      'use server';
      const { getSignInUrl } = await import("@workos-inc/authkit-nextjs");
      const { redirect } = await import("next/navigation");
      const signInUrl = await getSignInUrl();
      redirect(signInUrl);
    }}>
      <button
        type="submit"
        className="px-4 py-2 border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors font-medium cursor-pointer"
      >
        情緒卡
      </button>
    </form>
  );
}
