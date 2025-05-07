'use client'

import { usePickedSongStore } from '@/stores/usePickedSongStore'

import RecommendedHistoryCarousel from './RecommendedHistoryCarousel'
import RecommendedHistorySkeleton from './RecommendedHistorySkeleton'

export default function RecommendedHistoryCard() {
  const { hydrated } = usePickedSongStore()
  return hydrated ? <RecommendedHistoryCarousel /> : <RecommendedHistorySkeleton />
}
