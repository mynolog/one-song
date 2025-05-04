'use client'

import { useState } from 'react'

import { Menu, X } from 'lucide-react'

import Title from '../common/Title'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

interface HeaderDrawerMenuProps {
  className: string
}

export default function HeaderDrawerMenu({ className = '' }: HeaderDrawerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerTrigger asChild>
          <Button variant="ghost">{isOpen ? <X /> : <Menu />}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex justify-end px-4 pt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="닫기"
            >
              <X />
            </Button>
          </div>
          <div className="px-6 py-4">
            <DrawerHeader>
              <DrawerTitle>
                <Title />
              </DrawerTitle>
            </DrawerHeader>
            <ul className="flex flex-col gap-5 py-4 font-semibold">
              <li>회원가입</li>
              <li>오늘의 추천 노래</li>
              <li>내가 찜한 노래</li>
            </ul>
          </div>
          <DrawerFooter>
            <div className="text-muted-foreground flex flex-col items-start gap-1 text-xs">
              <span>© 2025 OneSong</span>
              <span>v0.1.0</span>
              <span>Build by Minho Lee</span>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
