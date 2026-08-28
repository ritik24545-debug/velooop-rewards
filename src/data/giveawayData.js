import iphoneImage from '../assets/ChatGPT Image Aug 19, 2026, 01_40_53 PM.png'
import watchImage from '../assets/ChatGPT Image Aug 19, 2026, 01_55_25 PM.png'
import airpodsImage from '../assets/ChatGPT Image Aug 19, 2026, 02_06_07 PM.png'

export const giveawayStats = {
  totalGiveaways: '24',
  participants: '8,500+',
  prizesWon: '1,200+',
}

export const winnerAnnouncements = [
  {
    maskedUserId: 'VE****21',
    prize: 'iPhone 15 Pro',
  },
  {
    maskedUserId: 'VE****83',
    prize: 'Apple Watch',
  },
  {
    maskedUserId: 'VE****54',
    prize: 'AirPods Pro',
  },
  {
    maskedUserId: 'VE****92',
    prize: 'Amazon Gift Card',
  },
]

export const currentWinners = [
  {
    id: 'winner-001',
    maskedUserId: 'VE****21',
    displayName: 'Alex M.',
    prize: 'iPhone 15 Pro',
    giveaway: 'Tech Giveaway',
    status: 'REWARDED',
    isWinner: true,
    prizeType: 'PHYSICAL',
  },
  {
    id: 'winner-002',
    maskedUserId: 'VE****83',
    displayName: 'Priya S.',
    prize: 'Apple Watch',
    giveaway: 'Smart Wearable',
    status: 'REWARDED',
    isWinner: false,
    prizeType: 'PHYSICAL',
  },
  {
    id: 'winner-003',
    maskedUserId: 'VE****54',
    displayName: 'Daniel R.',
    prize: 'AirPods Pro',
    giveaway: 'Audio Giveaway',
    status: 'REWARDED',
    isWinner: false,
    prizeType: 'PHYSICAL',
  },
]

export const previousWinners = [
  {
    id: 'previous-001',
    maskedUserId: 'VE****92',
    displayName: 'Demo Winner',
    prize: 'Amazon Gift Card',
    giveaway: 'Rewards Giveaway',
    status: 'REWARDED',
    isWinner: true,
    prizeType: 'GIFT_CARD',
  },
]

export const featuredGiveaways = [
  {
    id: 1,
    title: 'iPhone 15 Pro',
    category: 'Tech Giveaway',
    description:
      'Get a chance to win the powerful iPhone 15 Pro through the VELOOP Rewards giveaway.',
    image: iphoneImage,
    prizeValue: '$999',
    winners: 1,
    participants: 2847,
    maxEntries: 5000,
    entryFee: 50,
    currency: 'VEs',
    status: 'ACTIVE',
    featured: true,
    startAt: '2026-08-01T00:00:00',
    endAt: '2026-09-15T23:59:59',
  },

  {
    id: 2,
    title: 'Apple Watch',
    category: 'Smart Wearable',
    description:
      'Join this giveaway and get a chance to take home a premium Apple Watch.',
    image: watchImage,
    prizeValue: '$399',
    winners: 1,
    participants: 1642,
    maxEntries: 3000,
    entryFee: 30,
    currency: 'VEs',
    status: 'UPCOMING',
    featured: true,
    startAt: '2026-09-01T00:00:00',
    endAt: '2026-09-20T23:59:59',
  },

  {
    id: 3,
    title: 'AirPods Pro',
    category: 'Audio',
    description:
      'Enter for a chance to win premium wireless audio with AirPods Pro.',
    image: airpodsImage,
    prizeValue: '$249',
    winners: 1,
    participants: 2180,
    maxEntries: 3500,
    entryFee: 35,
    currency: 'VEs',
    status: 'ENDED',
    featured: true,
    startAt: '2026-07-01T00:00:00',
    endAt: '2026-08-15T23:59:59',
  },
]