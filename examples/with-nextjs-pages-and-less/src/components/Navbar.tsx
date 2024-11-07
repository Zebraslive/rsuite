'use client';

import React from 'react';
import { Nav } from 'rsuite';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const Navbar = ({ activeKey }: { activeKey: string }) => {
  const { data: session } = useSession();

  return (
    <Nav>
      <Nav.Item as={Link} href="/" active={activeKey === 'home'}>
        Home
      </Nav.Item>
      <Nav.Item as={Link} href="/about" active={activeKey === 'about'}>
        About
      </Nav.Item>
      {session ? (
        <>
          <Nav.Item onClick={() => signOut()}>Logout</Nav.Item>
          <Nav.Item>
            <Image src={session.user.image} alt="User Avatar" width={30} height={30} />
            {session.user.name}
          </Nav.Item>
        </>
      ) : (
        <Nav.Item onClick={() => signIn('discord')}>Login</Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
