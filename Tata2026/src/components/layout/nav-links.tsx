'use client';

import * as React from 'react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Car,
  BarChart3,
  Wrench,
  TestTube,
  Bot,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vehicles', label: 'Vehicles', icon: Car },
  { href: '/history', label: 'History', icon: BarChart3 },
  { href: '/maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/simulator', label: 'Simulator', icon: TestTube },
  { href: '/assistant', label: 'Assistant', icon: Bot },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="flex flex-col h-full">
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
            variant="default"
            className="group-data-[collapsible=icon]:justify-center bg-transparent hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-sidebar-primary"
          >
            <Link href={link.href}>
              <link.icon />
              <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
