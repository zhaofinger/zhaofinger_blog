'use client';

import Image from 'next/image';
import Link from 'next/link';

import logoIcon from './finger.png';
import { usePathname } from 'next/navigation';

const navLinkList = [
  {
    name: '文 章',
    path: '/article',
  },
  {
    name: '摄 影',
    path: '/photo',
  },
  {
    name: '影 视',
    path: '/film',
  },
  {
    name: '关 于',
    path: '/about',
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <div id="header">
      <Image src={logoIcon} alt="logo" className="logo" />
      <div className="word">
        <Link href="/" className="title">
          <h1>赵的拇指</h1>
        </Link>
        <div className="menu">
          {navLinkList.map((item) => (
            <Link
              className={pathname === item.path ? 'active' : ''}
              key={item.path}
              href={item.path}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
