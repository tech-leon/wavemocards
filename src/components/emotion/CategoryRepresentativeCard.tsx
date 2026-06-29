import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getEmotionCardCategoryStyle } from './emotion-card-config';

interface CategoryRepresentativeCardProps {
  slug: string;
  name: string;
  href: string;
  imageId: number;
}

/**
 * 140px category card showing the category's representative emotion image and
 * name. Shared by the emo-cards browse view and the explore card-selection
 * folded view, which both link to the category's card list.
 */
export function CategoryRepresentativeCard({
  slug,
  name,
  href,
  imageId,
}: CategoryRepresentativeCardProps) {
  const styles = getEmotionCardCategoryStyle(slug);

  return (
    <Link
      href={href}
      className={cn(
        'group w-[140px] h-[140px] rounded-xl',
        'flex flex-col items-center justify-center p-3',
        'transition-all duration-200',
        styles.bg,
        styles.hoverBorder,
        'hover:border-4 hover:p-2'
      )}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image
          src={`/images/emoCards/${imageId}.svg`}
          alt={name}
          width={64}
          height={64}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <p className="type-subsection-title type-card-name mt-2">
        {name[0]}&nbsp;{name[1]}
      </p>
    </Link>
  );
}
