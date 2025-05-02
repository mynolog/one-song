import { Menu } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import Title from '../common/Title'

interface HeaderDrawerMenuProps {
  className: string
}

export default function HeaderDrawerMenu({ className = '' }: HeaderDrawerMenuProps) {
  return (
    <div className={className}>
      <Drawer direction="right">
        <DrawerTrigger>
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
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
