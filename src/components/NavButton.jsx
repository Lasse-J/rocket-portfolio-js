'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NavButton = ({
  icon: Icon,
  label,
  href
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
}

export default NavButton;
