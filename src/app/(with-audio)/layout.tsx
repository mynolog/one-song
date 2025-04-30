import WithAudioLayout from '@/components/layouts/WithAudioLayout'

export default function WithAudioPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <WithAudioLayout>{children}</WithAudioLayout>
}
